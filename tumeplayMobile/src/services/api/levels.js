import {gql} from '@apollo/client';

export const GET_LEVELS = gql`
  query getLevels {
    niveaus {
      id
      name
      value
    }
  }
`;
