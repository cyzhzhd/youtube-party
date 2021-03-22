import { useQuery, useReactiveVar } from '@apollo/client';
import { ReactElement, useEffect } from 'react';
import { currentVideoIdVar, currentVideoTimeVar, socketQueueVar, videoListVar } from '../../cache';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import { GET_PARTY } from '../../queries/party';
import { PartyListResponse } from '../../types';

type ReturnType = {
  error?: ReactElement;
  loading?: ReactElement;
  values?: { partyData?: PartyListResponse };
};
export default function usePartyRoom(partyId: string): ReturnType {
  const queue = useReactiveVar(socketQueueVar);
  useEffect(() => {
    joinPartyRoom();
    return () => leavePartyRoom();

    function joinPartyRoom() {
      socketQueueVar([
        ...queue,
        {
          type: 'joinPartyRoom',
          partyId,
        },
      ]);
    }
    function leavePartyRoom() {
      socketQueueVar([
        ...queue,
        {
          type: 'leavePartyRoom',
          partyId,
        },
      ]);
      videoListVar([]);
      currentVideoIdVar('');
      currentVideoTimeVar(0);
    }
  }, []);

  const { data, error, loading } = useQuery<{ party: PartyListResponse }>(GET_PARTY, {
    variables: { partyId },
  });

  const currentVideoId = useReactiveVar(currentVideoIdVar);
  useReactiveVar(videoListVar);
  useEffect(() => {
    setVideoIdAndList();

    function setVideoIdAndList() {
      if (data) {
        if (!currentVideoId) currentVideoIdVar(data.party.videos[0]?.vid);
        videoListVar(data.party.videos);
      }
    }
  }, [data]);

  if (error) return { error: <Error /> };
  if (loading) return { loading: <Loading /> };

  return {
    values: { partyData: data?.party },
  };
}
