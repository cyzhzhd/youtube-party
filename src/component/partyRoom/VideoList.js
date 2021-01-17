import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Youtube from 'react-youtube';
import { currentVideoId, socketQueue, videoList } from '../../store/state';
import AddVideo from './AddVideo';

export default function VideoList() {
  const videos = useRecoilValue(videoList);
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

  const list = videos.map((video) => {
    return (
      <li key={video._id}>
        <button onClick={() => deleteVideo(video.vid)}>delete</button>
        <button onClick={() => watchVideo(video.vid)}>watch</button>
        <Youtube
          videoId={video.vid}
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
