import React from 'react';
import Youtube from 'react-youtube';
import { useRecoilState, useRecoilValue } from 'recoil';
import useInput from '../../hook/useInput';
import { sessionId, socketQueue, videoList } from '../../store/state';

export default function AddVideo() {
  const [url, urlInput, setUrl] = useInput({ type: 'text' });
  const [list, setList] = useRecoilState(videoList);
  const [queue, setQueue] = useRecoilState(socketQueue);
  const uId = useRecoilValue(sessionId);
  const videoId = urlParser(url);
  let content;
  if (videoId === 'error') {
    content = '';
  } else {
    content = (
      <Youtube
        videoId={videoId}
        opts={{
          height: '180',
          width: '240',
        }}
      />
    );
  }

  async function addVideoOnList() {
    if (videoId === 'error') return;
    // setList([...list, videoId]);
    setQueue([
      ...queue,
      {
        type: 'updateVideoList',
        videoId,
        uId,
      },
    ]);
    setUrl('');
  }
  return (
    <div className='party-room-add-video'>
      <div className='party-room-add-form'>
        <button onClick={addVideoOnList}>add</button>
        {urlInput}
      </div>
      <div className='party-room-adding-video'>{content}</div>
    </div>
  );
}

function urlParser(url) {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return match[2];
  } else {
    return 'error';
  }
}