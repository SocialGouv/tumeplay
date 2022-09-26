import {gql} from '@apollo/client';

export const GET_SEXTUS_WORDS = gql`
  query getSextusWords {
    sextusWords {
      definition
      word
    }
  }
`;

export const CREATE_SEXTUS_HISTORY = gql`
  mutation createSextusHistory(
    $utilisateurs_mobile: ID!
    $word_to_guess: String!
    $nb_try: Int!
    $duration: Long
    $status: ENUM_SEXTUSHISTORY_STATUS
  ) {
    createSextusHistory(
      input: {
        data: {
          utilisateurs_mobile: $utilisateurs_mobile
          word_to_guess: $word_to_guess
          nb_try: $nb_try
          duration: $duration
          status: $status
        }
      }
    ) {
      sextusHistory {
        id
      }
    }
  }
`;

export const UPDATE_SEXTUS_HISTORY = gql`
  mutation updateSextusHistory(
    $history_id: ID!
    $nb_try: Int!
    $duration: Long
    $status: ENUM_SEXTUSHISTORY_STATUS
  ) {
    updateSextusHistory(
      input: {
        where: {id: $history_id}
        data: {nb_try: $nb_try, duration: $duration, status: $status}
      }
    ) {
      sextusHistory {
        id
      }
    }
  }
`;
