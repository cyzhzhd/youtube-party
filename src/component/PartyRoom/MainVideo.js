import { useRecoilValue } from 'recoil';
import { currentVideo } from '../../store/state';

export default function MainVideo() {
  const video = useRecoilValue(currentVideo);

  return <div className='party-room-main-video'>{video}</div>;
}
