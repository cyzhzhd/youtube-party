import React from 'react';
import Youtube from 'react-youtube';
import { useRecoilState } from 'recoil';
import useInput from '../../hook/useInput';
import { videoList } from '../../store/state';

export default function AddVideo() {
  const [url, urlInput, setUrl] = useInput({ type: 'text' });
  const [list, setList] = useRecoilState(videoList);
  const id = urlParser(url);

  function addVideoOnList() {
    setList([...list, id]);
    setUrl('');
  }
  return (
    <>
      {urlInput} <button onClick={addVideoOnList}>add</button>
      <Youtube videoId={id} />
    </>
  );
}

// function onReady(event) {
//   event.target.pauseVideo();
// }

function urlParser(url) {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return match[2];
  } else {
    return 'error';
  }
}
