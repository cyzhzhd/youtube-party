import { ReactElement, useEffect, useState } from 'react';
import Youtube from 'react-youtube';
import { videoTimeVar, socketQueueVar, isTimeUpToDateVar, videoIdVar } from '../../cache';
import { useReactiveVar } from '@apollo/client';
import { useParams } from 'react-router';
import { YouTubePlayer } from 'youtube-player/dist/types';

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
    <div className="party-room-main-video">
      <Youtube
        {...{ videoId, onReady }}
        opts={{
          height: '480',
          width: '720',
          playerVars: { autoplay: 1 },
        }}
      />
      )
    </div>
  );
}
