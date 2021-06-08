import {gql} from '@apollo/client';

export const GET_THEMES = gql`
    query GetThemes {
      thematiques {
        title
        image {url} 
      }
    }
  `