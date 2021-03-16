import { ReactElement, useEffect, useState } from 'react';
import Youtube from 'react-youtube';
import { useReactiveVar } from '@apollo/client';
import { useParams } from 'react-router';
import { YouTubePlayer } from 'youtube-player/dist/types';
import styles from '../../assets/scss/PartyRoom.module.scss';
import { videoTimeVar, socketQueueVar, isTimeUpToDateVar, videoIdVar } from '../../cache';

export default function MainVideo(): ReactElement {
  const { partyId } = useParams<{ partyId: string }>();
  const videoId = useReactiveVar(videoIdVar);
  const time = useReactiveVar(videoTimeVar);
  const queue = useReactiveVar(socketQueueVar);
  const isUpToDate = useReactiveVar(isTimeUpToDateVar);

  const [player, setPlayer] = useState<YouTubePlayer>();
  const [videoTime, setVideoTime] = useState(0);
  useEffect(() => {
    if (!player) return;

    if (Math.abs(time - player.getCurrentTime()) > 2) {
      if (isUpToDate) {
        videoTimeVar(player.getCurrentTime());
        socketQueueVar([
          ...queue,
          {
            type: 'syncVideoTime',
            partyId,
            videoId,
            time: player.getCurrentTime(),
          },
        ]);
      } else {
        player.seekTo(time, true);
        isTimeUpToDateVar(true);
      }
    } else {
      videoTimeVar(player.getCurrentTime());
    }
  }, [videoTime]);

  function onReady(event: { target: YouTubePlayer }) {
    setPlayer(event.target);
    setInterval(() => {
      setVideoTime(event.target.getCurrentTime());
    }, 1000);
  }

  return (
    <div className={styles.mainVideoWrapper}>
      <Youtube
        className={styles.mainVideo}
        {...{ videoId, onReady }}
        opts={{
          height: '100%',
          width: '100%',
          playerVars: { autoplay: 1 },
        }}
      />
    </div>
  );
}
