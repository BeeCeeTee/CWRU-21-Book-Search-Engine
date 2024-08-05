import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me($_id: ID, $username: String) {
    user(_id: $_id) {
      _id
      username
      email
      bookCound
      savedBooks
    }
  }
`;