import { ReactElement, useState } from 'react';
import Youtube from 'react-youtube';
import { useReactiveVar } from '@apollo/client';
import { useParams } from 'react-router';
import styles from '../../assets/scss/PartyRoom.module.scss';
import { currentVideoIdVar, socketQueueVar, videoListVar } from '../../cache';
import AddVideo from './AddVideo';
import { Video } from '../../types';

export default function VideoList(): ReactElement {
  const videoList = useReactiveVar(videoListVar);
  const queue = useReactiveVar(socketQueueVar);
  const { partyId } = useParams<{ partyId: string }>();
  useReactiveVar(currentVideoIdVar);

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
    currentVideoIdVar(videoId);
    socketQueueVar([
      ...queue,
      {
        type: 'syncVideoId',
        videoId,
        partyId,
      },
    ]);
  }

  const [isListMode, setIsListMode] = useState(true);
  return (
    <div className={styles.playList}>
      <div className={styles.playListHeader}>
        <div>동영상 목록</div>
        <div onClick={() => setIsListMode(!isListMode)}>{isListMode ? '추가하기' : '목록보기'}</div>
      </div>
      {isListMode ? (
        <ul className={styles.videoList}>
          {videoList.map((video: Video) => (
            <li className={styles.videoListVideo} key={video._id}>
              <div className={styles.videoListVideoArea}>
                <Youtube
                  videoId={video.vid}
                  opts={{
                    height: '94',
                    width: '168',
                  }}
                />
              </div>
              <div className={styles.videoListVideoDesc}>
                <div>비디오 이름</div>
                <div>추가한 사람</div>
                <div className={styles.videoListControlBtn}>
                  <button onClick={() => watchVideo(video.vid)}>시청</button>
                  <button onClick={() => deleteVideo(video.vid)}>삭제</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <AddVideo backToList={() => setIsListMode(true)} />
      )}
    </div>
  );
}
