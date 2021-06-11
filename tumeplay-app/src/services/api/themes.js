import {gql} from '@apollo/client';

export const GET_THEMES = gql`
  query GetThemes {
    thematiques {
      id
      title
      image {
        url
      }
      display_quiz
    }
  }
`;
