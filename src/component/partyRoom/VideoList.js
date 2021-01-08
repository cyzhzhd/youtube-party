import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Youtube from 'react-youtube';
import { currentVideoId, socketQueue, videoList } from '../../store/state';
import AddVideo from './AddVideo';

export default function VideoList() {
  const idList = useRecoilValue(videoList);
  const setCurrentVideoId = useSetRecoilState(currentVideoId);
  const [queue, setQueue] = useRecoilState(socketQueue);

  function deleteVideo(videoId) {
    setQueue([
      ...queue,
      {
        type: 'updateVideoList',
        add: false,
        videoId,
      },
    ]);
  }

  function watchVideo(videoId) {
    setCurrentVideoId(videoId);
    setQueue([
      ...queue,
      {
        type: 'syncVideoId',
        videoId,
      },
    ]);
  }

  const list = idList.map((id) => {
    return (
      <li key={id}>
        <button onClick={() => deleteVideo(id)}>delete</button>
        <button onClick={() => watchVideo(id)}>watch</button>
        <Youtube
          videoId={id}
          opts={{
            height: '180',
            width: '240',
          }}
        />
      </li>
    );
  });

  return (
    <div className='party-room-play-list'>
      <ul className='party-room-video-list'>{list}</ul>
      <AddVideo />
    </div>
  );
}
