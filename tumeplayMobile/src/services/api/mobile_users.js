import {gql} from '@apollo/client';

export const GET_MOBILE_USER = gql`
  query GetMobileUser($user_id: ID!) {
    utilisateursMobile(id: $user_id) {
      first_name
      isUnder25
      ageRange
      isOnboarded
      isSignedUp
      user_id
      id
      percentage_level_completed
      history {
        id
        module_id
        status
      }
      next_module
      next_module_questions {
        id
        text_question: text_question_mobile
        text_answer
        kind
        responses {
          response_A: response_A_mobile
          response_B: response_B_mobile
          response_C: response_C_mobile
          right_answer
        }
      }
      level
      pending_module
      pending_module_questions {
        id
        text_question: text_question_mobile
        text_answer
        kind
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

export const POST_MOBILE_USER = gql`
  mutation CreateMobileUser(
    $first_name: String!
    $isOnboarded: Boolean!
    $isSignedUp: Boolean!
    $isUnder25: Boolean!
    $has_followed_tutorial: Boolean!
    $ageRange: String!
    $region: String!
    $user_id: String!
  ) {
    createUtilisateursMobile(
      input: {
        data: {
          first_name: $first_name
          isOnboarded: $isOnboarded
          isSignedUp: $isSignedUp
          isUnder25: $isUnder25
          ageRange: $ageRange
          region: $region
          has_followed_tutorial: $has_followed_tutorial
          user_id: $user_id
        }
      }
    ) {
      utilisateursMobile {
        user_id
        first_name
        isOnboarded
        isSignedUp
        isUnder25
        ageRange
        region
      }
    }
  }
`;

export const UPDATE_MOBILE_USER = gql`
  mutation UpdateMobileUser(
    $first_name: String!
    $isOnboarded: Boolean!
    $isSignedUp: Boolean!
    $isUnder25: Boolean!
    $has_followed_tutorial: Boolean!
    $ageRange: String!
    $region: String!
    $user_id: String!
    $id: ID!
  ) {
    updateUtilisateursMobile(
      input: {
        where: {id: $id}
        data: {
          first_name: $first_name
          isOnboarded: $isOnboarded
          isSignedUp: $isSignedUp
          isUnder25: $isUnder25
          ageRange: $ageRange
          region: $region
          has_followed_tutorial: $has_followed_tutorial
          user_id: $user_id
        }
      }
    ) {
      utilisateursMobile {
        user_id
        first_name
        isOnboarded
        isSignedUp
        isUnder25
        ageRange
        region
        has_followed_tutorial
      }
    }
  }
`;

export const UPDATE_MOBILE_USER_HISTORY = gql`
  mutation UpdateHistorique(
    $history_id: ID!
    $module_id: ID!
    $status: ENUM_HISTORIQUEV2_STATUS
  ) {
    updateHistoriqueV2(
      input: {
        where: {id: $history_id}
        data: {module: $module_id, status: $status}
      }
    ) {
      historiqueV2 {
        id
        status
        module {
          id
        }
      }
    }
  }
`;

export const CREATE_MOBILE_USER_FIRST_TRY = gql`
  mutation CreateQuizFirstTry(
    $percentage_right_answers: Float!
    $utilisateurs_mobile: ID!
    $module: ID!
  ) {
    createQuizFirstTry(
      input: {
        data: {
          percentage_right_answers: $percentage_right_answers
          utilisateurs_mobile: $utilisateurs_mobile
          module: $module
        }
      }
    ) {
      __typename
    }
  }
`;

export const CREATE_HISTORY = gql`
  mutation UpdateHistorique(
    $user_id: ID
    $module_id: ID
    $status: ENUM_HISTORIQUEV2_STATUS
  ) {
    createHistoriqueV2(
      input: {data: {user: $user_id, module: $module_id, status: $status}}
    ) {
      historiqueV2 {
        id
      }
    }
  }
`;
