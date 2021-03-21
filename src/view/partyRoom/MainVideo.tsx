import { ReactElement, useEffect, useState } from 'react';
import Youtube from 'react-youtube';
import { useReactiveVar } from '@apollo/client';
import { useParams } from 'react-router';
import { YouTubePlayer } from 'youtube-player/dist/types';
import styles from '../../assets/scss/PartyRoom.module.scss';
import { currentVideoTimeVar, socketQueueVar, isTimeUpToDateVar, currentVideoIdVar } from '../../cache';

export default function MainVideo(): ReactElement {
  const { partyId } = useParams<{ partyId: string }>();
  const currentVideoId = useReactiveVar(currentVideoIdVar);
  const currentTime = useReactiveVar(currentVideoTimeVar);
  const queue = useReactiveVar(socketQueueVar);
  const isUpToDate = useReactiveVar(isTimeUpToDateVar);

  const [player, setPlayer] = useState<YouTubePlayer>();
  const [videoTime, setVideoTime] = useState(0);
  useEffect(() => {
    if (!player) return;

    if (Math.abs(currentTime - player.getCurrentTime()) > 2) {
      if (isUpToDate) {
        currentVideoTimeVar(player.getCurrentTime());
        socketQueueVar([
          ...queue,
          {
            type: 'syncVideoTime',
            partyId,
            videoId: currentVideoId,
            time: player.getCurrentTime(),
          },
        ]);
      } else {
        player.seekTo(currentTime, true);
        isTimeUpToDateVar(true);
      }
    } else {
      currentVideoTimeVar(player.getCurrentTime());
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
        {...{ currentVideoId, onReady }}
        opts={{
          height: '100%',
          width: '100%',
          playerVars: { autoplay: 1 },
        }}
      />
    </div>
  );
}
