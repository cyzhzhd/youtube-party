import React, { ReactElement } from 'react';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import useInput from '../../hook/useInput';
import { message, messages, sessionId, socketQueue } from '../../store/state';

function ChatMessages() {
  const msgs = useRecoilValue(messages);

  const msgList = msgs.map((val, idx) => {
    return (
      <li key={idx}>
        <div className="msg-wrapper">
          <p>{val.uid}</p>
          <p>{val.content}</p>
        </div>
      </li>
    );
  });

  return <ul className="chat-messages chat-body">{msgList}</ul>;
}

export default function Chat(): ReactElement {
  const [queue, setQueue] = useRecoilState(socketQueue);
  const uid = useRecoilValue(sessionId);
  const setSendingMsg = useSetRecoilState(message);
  const [userMsg, userMsgInput, setUserMsg] = useInput({ type: 'text' });

  function onClickBtn() {
    setSendingMsg(userMsg);
    setQueue([
      ...queue,
      {
        type: 'sendMsg',
        content: userMsg,
        uid,
      },
    ]);
    setUserMsg('');
  }
  return (
    <div className="party-room-chat">
      <ChatMessages />
      <div className="chat-input-wrapper">
        {userMsgInput}
        <button onClick={onClickBtn}>send</button>
      </div>
    </div>
  );
}
