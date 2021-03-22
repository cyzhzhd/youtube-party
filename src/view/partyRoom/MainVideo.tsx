import { ReactElement, useEffect, useState } from 'react';
import Youtube from 'react-youtube';
import { useReactiveVar } from '@apollo/client';
import { useParams } from 'react-router';
import { YouTubePlayer } from 'youtube-player/dist/types';
import styles from '../../assets/scss/PartyRoom.module.scss';
import { currentVideoTimeVar, socketQueueVar, videoTimeReceivedVar, currentVideoIdVar } from '../../cache';

const ALLOWED_TIME_GAP = 2;
export default function MainVideo(): ReactElement {
  const { partyId } = useParams<{ partyId: string }>();
  const [player, setPlayer] = useState<YouTubePlayer>();
  const [videoTime, setVideoTime] = useState(0);

  const currentVideoId = useReactiveVar(currentVideoIdVar);
  const currentTime = useReactiveVar(currentVideoTimeVar);
  const queue = useReactiveVar(socketQueueVar);
  const videoTimeReceived = useReactiveVar(videoTimeReceivedVar);
  useEffect(() => {
    synchrnizeVideoTime();

    function synchrnizeVideoTime() {
      if (!player) return;

      if (Math.abs(currentTime - player.getCurrentTime()) > ALLOWED_TIME_GAP) {
        if (videoTimeReceived) {
          player.seekTo(currentTime, true);
          videoTimeReceivedVar(true);
        } else {
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
        }
      } else {
        currentVideoTimeVar(player.getCurrentTime());
      }
    }
  }, [videoTime]);

  function onYoutubePlayerReady({ target }: { target: YouTubePlayer }) {
    setPlayer(target);
    setInterval(() => {
      setVideoTime(target.getCurrentTime());
    }, 1000);
  }

  return (
    <div className={styles.mainVideoWrapper}>
      <Youtube
        className={styles.mainVideo}
        videoId={currentVideoId}
        onReady={onYoutubePlayerReady}
        opts={{
          height: '100%',
          width: '100%',
          playerVars: { autoplay: 1 },
        }}
      />
    </div>
  );
}
