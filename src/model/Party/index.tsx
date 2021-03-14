import { useMutation } from '@apollo/client';
import { sessionIdVar } from '../../cache';
import { CREATE_PARTY } from '../../queries/party';

type ReturnType = {
  operations: {
    createParty: (string) => void;
  };
};
export default function useParty(): ReturnType {
  const [createPartyMutation] = useMutation(CREATE_PARTY);
  function createParty(partyName: string) {
    createPartyMutation({
      variables: {
        uid: sessionIdVar(),
        partyName,
      },
    });
  }
  return {
    operations: { createParty },
  };
}
