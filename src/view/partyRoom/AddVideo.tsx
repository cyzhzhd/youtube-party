import React, { ReactElement } from 'react';
import Youtube from 'react-youtube';
import useInput from '../../hooks/useInput';
import { socketQueueVar } from '../../cache';
import { useParams } from 'react-router';
import { useReactiveVar } from '@apollo/client';
import urlParser from '../../helper/urlParser';

export default function AddVideo(): ReactElement {
  const [url, urlInput, setUrl] = useInput({ type: 'text' });
  const { partyId } = useParams<{ partyId: string }>();
  const queue = useReactiveVar(socketQueueVar);
  const videoId = urlParser(url);

  function addVideoOnList() {
    if (videoId === 'error') return;
    socketQueueVar([
      ...queue,
      {
        type: 'updateVideoList',
        add: true,
        videoId,
        partyId,
      },
    ]);
    setUrl('');
  }
  return (
    <div className="party-room-add-video">
      <div className="party-room-add-form">
        <button onClick={addVideoOnList}>add</button>
        {urlInput}
      </div>
      <div className="party-room-adding-video">
        {videoId !== 'error' && (
          <Youtube
            videoId={videoId}
            opts={{
              height: '180',
              width: '240',
            }}
          />
        )}
      </div>
    </div>
  );
}
