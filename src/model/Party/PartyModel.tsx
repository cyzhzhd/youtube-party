import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router';
import { userVar } from '../../cache';
import { CREATE_PARTY } from '../../queries/party';

type ReturnType = {
  operations: {
    createParty: (partyName: string) => void;
  };
};
export default function useParty(): ReturnType {
  const history = useHistory();
  const [createPartyMutation] = useMutation(CREATE_PARTY, {
    onCompleted({ createParty }) {
      history.push(`/partyRoom/${createParty.party._id}`);
    },
  });
  function createParty(partyName: string) {
    createPartyMutation({
      variables: {
        uid: userVar()?.nickName,
        partyName,
      },
    });
  }
  return {
    operations: { createParty },
  };
}
