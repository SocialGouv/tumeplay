import {gql} from '@apollo/client';

export const GET_QUESTIONS = gql`
  query GetQuestions($theme_id: String!) {
    questions(where: {theme: {id: $theme_id}}) {
      id
      text_question
      text_answer
      responses {
        response_A
        response_B
        response_C
        response_A_neutral
        response_B_neutral
        response_C_neutral
        right_answer
      }
      image {
        url
      }
    }
  }
`;
