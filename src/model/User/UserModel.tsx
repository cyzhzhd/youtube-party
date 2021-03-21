import { useMutation } from '@apollo/client';
import { SIGN_UP_USER } from '../../queries/user';

type ReturnType = {
  operations: {
    signUpUser: (id: string, password: string, nickName: string) => void;
  };
};
export default function useUser(): ReturnType {
  const [signUpUserMutation] = useMutation(SIGN_UP_USER);
  function signUpUser(id: string, password: string, nickName: string) {
    signUpUserMutation({
      variables: { id, password, nickName },
    });
  }
  return {
    operations: { signUpUser },
  };
}
