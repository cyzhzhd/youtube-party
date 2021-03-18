import { ReactElement, useState } from 'react';
import { useReactiveVar } from '@apollo/client';
import { useParams } from 'react-router';
import styles from '../../assets/scss/PartyRoom.module.scss';
import useInput from '../../hooks/useInput';
import { messagesVar, sessionIdVar, socketQueueVar } from '../../cache';

function ChatList() {
  const { partyId } = useParams<{ partyId: string }>();
  const queue = useReactiveVar(socketQueueVar);
  const uid = useReactiveVar(sessionIdVar);
  const msgs = useReactiveVar(messagesVar);
  const [userMsg, userMsgInput, setUserMsg] = useInput({ type: 'text' });

  function sendMessage() {
    socketQueueVar([
      ...queue,
      {
        type: 'sendMsg',
        uid,
        content: userMsg,
        partyId,
      },
    ]);
    setUserMsg('');
  }

  return (
    <div className={styles.chatList}>
      <ul className={styles.chatMessages}>
        {msgs.map((val, idx) => (
          <li key={idx}>
            <div className={styles.messageWrapper}>
              <p>{val.nickName}</p>
              <p>{val.content}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.chatInputWrapper}>
        {userMsgInput}
        <button onClick={sendMessage}>send</button>
      </div>
    </div>
  );
}
function UserList(): ReactElement {
  return <p>userlist</p>;
}

export default function Chat(): ReactElement {
  const [isChatMode, setIsChatMode] = useState(true);
  return (
    <div className={styles.chat}>
      <div className={styles.chatHeader}>
        <div className={isChatMode ? styles.selectedMode : ''} onClick={() => setIsChatMode(true)}>
          채팅목록
        </div>
        <div className={!isChatMode ? styles.selectedMode : ''} onClick={() => setIsChatMode(false)}>
          유저목록
        </div>
      </div>
      {isChatMode ? <ChatList /> : <UserList />}
    </div>
  );
}
