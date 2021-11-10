import {gql} from '@apollo/client';

const REACT_APP_ZONE = process.env.REACT_APP_ZONE;

export const GET_BOXES = gql`
  query GetBoxes {
    boxes(where: {environnement: {slug: "${REACT_APP_ZONE}"}}) {
      id
      title
      description
      number
      available
      products {
        id
        quantity
        produit {
          title
        }
      }
      image {
        url
      }
      stock
    }
  }
`;

export const GET_BOX_MESURES = gql`
  query GetBoxesMesures {
    boxSurMesure {
      id
      title
      description
      produits {
        produit {
          id
          title
          description
          image {
            url
          }
        }
        stock
      }
      image {
        url
      }
    }
  }
`;
