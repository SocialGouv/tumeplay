import {gql} from '@apollo/client';

export const GET_CONTENTS = gql`
  query GetContents($theme_id: String!, $level: Int!) {
    contents(
      where: {thematique_mobile: {id: $theme_id}, niveau: {value: $level}}
      sort: "niveau.value:desc"
    ) {
      id
      title: title_mobile
      text
      etiquette {
        image {
          url
        }
      }
      niveau {
        value
      }
      image {
        url
      }
      sound {
        url
      }
      external_link
      thematique_mobile {
        id
        color
        image {
          url
        }
        title
      }
    }
  }
`;

export const GET_FRESH_CONTENTS = gql`
  query GetFreshContents($level: Int!) {
    contents(limit: 10, where: {niveau: {value_lte: $level}}) {
      id
      title: title_mobile
      text
      etiquette {
        image {
          url
        }
      }
      niveau {
        value
      }
      image {
        url
      }
      sound {
        url
      }
      external_link
      theme: thematique_mobile {
        id
      }
    }
  }
`;

export const GET_SINGLE_CONTENT = gql`
  query GetSingleContent($content_id: String!, $theme_id: ID!) {
    contents(where: {id: $content_id}) {
      id
      title: title_mobile
      text
      etiquette {
        image {
          url
        }
      }
      image {
        url
      }
      external_link
    }
    thematiqueMobile(id: $theme_id) {
      color
      image {
        url
      }
      title
    }
  }
`;
