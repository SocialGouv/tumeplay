import {gql} from '@apollo/client';

export const GET_SEXTUS_WORDS = gql`
  query getSextusWords {
    sextusWords {
      definition
      word
    }
  }
`;
