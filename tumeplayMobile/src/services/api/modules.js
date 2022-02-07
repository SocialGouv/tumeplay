import {gql} from '@apollo/client';
// import {REACT_APP_ZONE} from '@env';

export const GET_MODULES = gql`
  query getModules($level: Int) {
    modules(where: {niveau: {value: $level}}) {
      id
      thematique: thematique_mobile {
        id
        title
      }
      niveau {
        name
        value
      }
      questionsArray {
        id
        text_question: text_question_mobile
				kind
        text_answer
        responses {
          response_A: response_A_mobile
          response_B: response_B_mobile
          response_C: response_C_mobile
          right_answer
        }
      }
    }
  }
`;
