import {gql} from '@apollo/client';

export const GET_THEMES = gql`
  query GetThemes($level: Int!) {
    thematiqueMobiles(where: {level: $level}) {
      id
      title
      image {
        url
      }
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
    }
  }
`;
