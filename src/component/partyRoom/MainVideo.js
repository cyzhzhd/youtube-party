import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Youtube from 'react-youtube';
import {
  currentVideo,
  currentVideoTime,
  partyRoomId,
  socketQueue,
  isTimeUpToDate,
} from '../../store/state';

export default function MainVideo() {
  const videoId = useRecoilValue(currentVideo);
  const partyId = useRecoilValue(partyRoomId);
  const [time, setTime] = useRecoilState(currentVideoTime);
  const [queue, setQueue] = useRecoilState(socketQueue);
  const [isUpToDate, setIsUpToDate] = useRecoilState(isTimeUpToDate);
  const [player, setPlayer] = useState(null);
  const [videoTime, setVideoTime] = useState(0);

  useEffect(() => {
    if (!player) return;
    if (Math.abs(time - player.getCurrentTime()) > 2) {
      if (isUpToDate) {
        console.log('before', time, player.getCurrentTime());
        setTime(player.getCurrentTime());
        console.log('after', time, player.getCurrentTime());
        setQueue([
          ...queue,
          {
            type: 'syncVideoTime',
            partyId,
            videoId,
            time: player.getCurrentTime(),
          },
        ]);
      } else {
        player.seekTo(time);
        setIsUpToDate(true);
      }
    } else {
      setTime(player.getCurrentTime());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoTime]);

  function onReady(event) {
    console.log('orReady', event.target);
    setPlayer(event.target);
    setInterval(() => {
      setVideoTime(event.target.getCurrentTime());
    }, 1000);
  }

  return (
    <div className='party-room-main-video'>
      <Youtube
        videoId={videoId}
        onReady={onReady}
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
