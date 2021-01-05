import React from 'react';
import Youtube from 'react-youtube';
import { useRecoilState } from 'recoil';
import useInput from '../../hook/useInput';
import { videoList } from '../../store/state';

export default function AddVideo() {
  const [url, urlInput, setUrl] = useInput({ type: 'text' });
  const [list, setList] = useRecoilState(videoList);
  const id = urlParser(url);
  let content;
  if (id === 'error') {
    content = '';
  } else {
    content = (
      <Youtube
        videoId={id}
        opts={{
          height: '180',
          width: '240',
        }}
      />
    );
  }

  function addVideoOnList() {
    setList([...list, id]);
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
