import { useMutation, useReactiveVar } from '@apollo/client';
import { userUpdatedVar } from '../../cache';
import { SEND_FRIEND_REQUEST, SIGN_UP_USER } from '../../queries/user';

type ReturnType = {
  operations: {
    signUpUser: (id: string, password: string, nickName: string) => void;
    sendFriendRequest: (uid: string) => void;
  };
};
export default function useUser(): ReturnType {
  const [signUpUserMutation] = useMutation(SIGN_UP_USER);
  function signUpUser(id: string, password: string, nickName: string) {
    signUpUserMutation({
      variables: { id, password, nickName },
    });
  }

  useReactiveVar(userUpdatedVar);
  const [sendFriendRequestMutation] = useMutation(SEND_FRIEND_REQUEST);
  function sendFriendRequest(id: string) {
    sendFriendRequestMutation({
      variables: { uid: id },
    });
    userUpdatedVar(true);
  }

  return {
    operations: { signUpUser, sendFriendRequest },
  };
}
