import {gql} from '@apollo/client';

export const POST_FEEDBACK = gql`
  mutation createFeedback($content: ID!, $appreciation: Int!) {
    createFeedback(
      input: {data: {contenu: $content, appreciation: $appreciation}}
    ) {
      feedback {
        id
      }
    }
  }
`;
