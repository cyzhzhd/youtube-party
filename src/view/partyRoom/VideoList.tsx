import { ReactElement } from 'react';
import Youtube from 'react-youtube';
import { videoIdVar, socketQueueVar, videoListVar } from '../../cache';
import AddVideo from './AddVideo';
import { Video } from '../../types';
import { useReactiveVar } from '@apollo/client';
import { useParams } from 'react-router';

export default function VideoList(): ReactElement {
  const videoList = useReactiveVar(videoListVar);
  const queue = useReactiveVar(socketQueueVar);
  const { partyId } = useParams<{ partyId: string }>();
  useReactiveVar(videoIdVar);

  function deleteVideo(videoId: string) {
    socketQueueVar([
      ...queue,
      {
        type: 'updateVideoList',
        add: false,
        videoId,
        partyId,
      },
    ]);
  }

  function watchVideo(videoId: string) {
    videoIdVar(videoId);
    socketQueueVar([
      ...queue,
      {
        type: 'syncVideoId',
        videoId,
        partyId,
      },
    ]);
  }

  return (
    <div className="party-room-play-list">
      <ul className="party-room-video-list">
        {videoList.map((video: Video) => (
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
        ))}
      </ul>
      <AddVideo />
    </div>
  );
}
