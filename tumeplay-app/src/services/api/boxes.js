import {gql} from '@apollo/client';

export const GET_BOXES = gql`
  query GetBoxes {
    boxes {
      id
      title
      description
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
