import {gql} from '@apollo/client';
// import {REACT_APP_ZONE} from '@env';

export const GET_ALL_MODULES = gql`
  query getAllModules {
    modules {
      id
      title
      thematique_mobile {
        title
      }
    }
  }
`;

export const GET_MODULES_BY_THEMATIQUES = gql`
  query getAllModules($theme_id: String) {
    modules(where: {thematique_mobile: {id: $theme_id}}) {
      id
      title
      thematique_mobile {
        id
        title
        color
        image {
          url
        }
      }
      niveau {
        value
      }
      questionsArray {
        id
        text_question: text_question_mobile
        kind
        text_answer
        save_response
        responses {
          response_A: response_A_mobile
          response_B: response_B_mobile
          response_C: response_C_mobile
          response_D: response_D_mobile
          right_answer
        }
      }
    }
  }
`;

export const GET_MODULES = gql`
  query getModules($level: Int) {
    modules(where: {niveau: {value: $level}}) {
      id
      title
      thematique: thematique_mobile {
        id
        title
        color
        image {
          url
        }
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
        save_response
        responses {
          response_A: response_A_mobile
          response_B: response_B_mobile
          response_C: response_C_mobile
          response_D: response_D_mobile
          right_answer
        }
      }
    }
  }
`;

export const GET_SINGLE_MODULE = gql`
  query GetSingleModule($module_id: ID!) {
    modules(where: {id: $module_id}) {
      id
      title
      thematique_mobile {
        id
        title
        color
        image {
          url
        }
      }
    }
  }
`;
