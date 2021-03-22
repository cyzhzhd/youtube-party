import { ReactElement } from 'react';
import Youtube from 'react-youtube';
import { useParams } from 'react-router';
import { useReactiveVar } from '@apollo/client';
import styles from '../../assets/scss/PartyRoom.module.scss';
import useInput from '../../hooks/useInput';
import { socketQueueVar } from '../../cache';
import urlParser from '../../helper/urlParser';

interface Props {
  backToList: () => void;
}
export default function AddVideo({ backToList }: Props): ReactElement {
  const [url, urlInput, setUrl] = useInput({ type: 'text' });
  const { partyId } = useParams<{ partyId: string }>();
  const queue = useReactiveVar(socketQueueVar);
  const videoId = urlParser(url);

  function addVideoOnList() {
    socketQueueVar([...queue, { type: 'updateVideoList', add: true, videoId, partyId }]);
    setUrl('');
    backToList();
  }
  return (
    <div className={styles.addVideo}>
      <div className={styles.addForm}>
        <div>URL: {urlInput}</div>
      </div>
      <div className={styles.searchedVideoForm}>
        {videoId !== 'error' && (
          <>
            <div className={styles.searchedVideo}>
              <Youtube
                videoId={videoId}
                opts={{
                  height: '100%',
                  width: '100%',
                }}
              />
            </div>
            <div>
              <button onClick={addVideoOnList}>추가하기</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
