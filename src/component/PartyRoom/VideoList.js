import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { videoListThumbnail } from '../../store/state';

export default function VideoList() {
  const videoListLoadable = useRecoilValueLoadable(videoListThumbnail);

  let content = null;
  switch (videoListLoadable.state) {
    case 'hasValue':
      content = videoListLoadable.contents;
      break;
    case 'hasError':
      content = '데이터를 불러오는 중 에러 발생';
      break;
    default:
      content = '...';
  }
  console.log(content);

  return <ul>{content}</ul>;
}
