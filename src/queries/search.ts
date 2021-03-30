import { gql } from '@apollo/client';

export const SEARCH_USER = gql`
  query SearchUser($keyword: String) {
    searchedUser(nickName: $keyword) {
      uid
      nickName
    }
  }
`;
