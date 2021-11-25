import {gql} from '@apollo/client';

export const GET_CONTENTS = gql`
  query GetContents($theme_id: String!) {
    contents(where: {theme: {id: $theme_id}}) {
      id
      title
      text
      image {
        url
      }
      sound {
        url
      }
      external_link
    }
  }
`;
