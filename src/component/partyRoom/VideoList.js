import React from 'react';
import { useRecoilValue } from 'recoil';
import { videoListThumbnail } from '../../store/state';
import AddVideo from './AddVideo';

export default function VideoList() {
  const videoList = useRecoilValue(videoListThumbnail);

  return (
    <div className='party-room-play-list'>
      <ul className='party-room-video-list'>{videoList}</ul>
      <AddVideo />
    </div>
  );
}
