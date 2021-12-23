import {gql} from '@apollo/client';

export const GET_POINTS = gql`
  query GetPoints {
    parametre {
      nb_points_wrong_answer
      nb_points_neutral_answer
      nb_points_right_answer
    }
  }
`;
