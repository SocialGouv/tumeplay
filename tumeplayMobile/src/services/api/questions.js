import {gql} from '@apollo/client';

export const GET_QUESTIONS = gql`
  query GetQuestions($theme_id: String!) {
    questions(where: {theme: {id: $theme_id}}) {
      id
      text_question: text_question_mobile
      text_answer
			kind
      responses {
        response_A: response_A_mobile
        response_B: response_B_mobile
        response_C: response_C_mobile
        response_A_neutral
        response_B_neutral
        response_C_neutral
        right_answer
      }
      image {
        url
      }
      sound_question {
        url
      }
      sound_answer {
        url
      }
    }
  }
`;
