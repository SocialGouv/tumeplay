import {gql} from '@apollo/client';

export const GET_THEMES = gql`
  query GetThemes {
    thematiqueMobiles {
      id
      title
      image {
        url
      }
      color
      border_color
    }
  }
`;

export const GET_COLOR_THEME = gql`
  query GetColorTheme($theme_id: ID!) {
    thematiqueMobiles(where: {id: $theme_id}) {
      color
    }
  }
`;

export const GET_SOSTHEME = gql`
  query {
    thematiqueMobiles(where: {title: "SOS à qui t'adresser"}) {
      id
      title
      image {
        url
      }
      color
      border_color
    }
  }
`;
