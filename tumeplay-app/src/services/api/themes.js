import {gql} from '@apollo/client';

const REACT_APP_ZONE = process.env.REACT_APP_ZONE;

export const GET_THEMES = gql`
  query GetThemes {
    thematiques(where: {environnement: {slug: "${REACT_APP_ZONE}"}}) {
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
