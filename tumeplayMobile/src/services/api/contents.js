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

export const GET_FRESH_CONTENTS = gql`
  query GetFreshContents {
    contents(limit: 10, sort: "created_at:desc") {
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
      theme {
        id
      }
    }
  }
`;

export const GET_SINGLE_CONTENT = gql`
  query GetSingleContent($content_id: String!) {
    contents(where: {id: $content_id}) {
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
