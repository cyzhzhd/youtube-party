import { useMutation } from '@apollo/client';
import { SIGN_IN_USER, SIGN_UP_USER } from '../../queries/user';

type ReturnType = {
  operations: {
    signUpUser: (id: string, password: string, nickName: string) => void;
    signInUesr: (id: string, password: string) => void;
  };
};
export default function useUser(): ReturnType {
  const [signInUserMutation] = useMutation(SIGN_IN_USER);
  function signInUesr(id: string, password: string) {
    signInUserMutation({
      variables: { id, password },
    });
  }
  const [signUpUserMutation] = useMutation(SIGN_UP_USER);
  function signUpUser(id: string, password: string, nickName: string) {
    signUpUserMutation({
      variables: { id, password, nickName },
    });
  }
  return {
    operations: { signUpUser, signInUesr },
  };
}
