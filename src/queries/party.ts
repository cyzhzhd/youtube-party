import { gql } from '@apollo/client';

export const partyFragment = {
  party: gql`
    fragment PartyDetail on Party {
      _id
      hostId
      partyName
      currentVideo {
        id
        vid
        title
      }
      videos {
        id
        vid
        title
      }
      numUsers
    }
  `,
};
export const GET_PARTY_LIST = gql`
  query GetPartyList($cursor: ID, $limit: Int!) {
    parties(cursor: $cursor, limit: $limit) {
      cursor
      hasMore
      parties {
        ...PartyDetail
      }
    }
  }
  ${partyFragment.party}
`;
export const GET_PARTY = gql`
  query GetParty($partyId: ID!) {
    party(partyId: $partyId) {
      ...PartyDetail
    }
  }
  ${partyFragment.party}
`;
export const CREATE_PARTY = gql`
  mutation CreateParty($uid: ID!, $partyName: String!) {
    createParty(uid: $uid, partyName: $partyName) {
      success
      message
      party {
        ...PartyDetail
      }
    }
  }
  ${partyFragment.party}
`;
