import {gql} from '@apollo/client';

export const GET_BOXES = gql`
  query GetBoxes {
    boxes(where: {environnement: {slug: "metropole"}}) {
      id
      title
      description
      number
      available
      stock
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
