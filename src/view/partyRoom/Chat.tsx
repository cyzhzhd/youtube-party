import React, { ReactElement } from 'react';
import { useReactiveVar } from '@apollo/client';
import useInput from '../../hooks/useInput';
import { messagesVar, sessionIdVar, socketQueueVar } from '../../cache';
import { useParams } from 'react-router';

function ChatMessages() {
  const msgs = useReactiveVar(messagesVar);

  return (
    <ul className="chat-messages chat-body">
      {msgs.map((val, idx) => (
        <li key={idx}>
          <div className="msg-wrapper">
            <p>{val.uid}</p>
            <p>{val.content}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function Chat(): ReactElement {
  const { partyId } = useParams<{ partyId: string }>();
  const queue = useReactiveVar(socketQueueVar);
  const uid = useReactiveVar(sessionIdVar);
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
    <div className="party-room-chat">
      <ChatMessages />
      <div className="chat-input-wrapper">
        {userMsgInput}
        <button onClick={sendMessage}>send</button>
      </div>
    </div>
  );
}
