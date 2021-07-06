import {gql} from '@apollo/client';

export const GET_THEMES = gql`
  query GetThemes {
    thematiques(where: {environnement: {slug: "${process.env.REACT_APP_ZONE}"}}) {
      id
      title
      image {
        url
      }
      sound {
        url
      }
      display_quiz
    }
  }
`;
