import {gql} from '@apollo/client';

export const GET_MOBILE_USER = gql`
  query GetMobileUser($user_id: ID!) {
    utilisateursMobile(id: $user_id) {
      first_name
      isUnder25
      isOnboarded
      isSignedUp
      points
      user_id
    }
  }
`;

export const POST_MOBILE_USER = gql`
  mutation CreateMobileUser(
    $first_name: String!
    $isOnboarded: Boolean!
    $isSignedUp: Boolean!
    $isUnder25: Boolean!
    $points: Long!
    $user_id: String!
  ) {
    createUtilisateursMobile(
      input: {
        data: {
          first_name: $first_name
          isOnboarded: $isOnboarded
          isSignedUp: $isSignedUp
          isUnder25: $isUnder25
          points: $points
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
        points
      }
    }
  }
`;

export const UPDATE_MOBILE_USER_POINTS = gql`
  mutation UpdateHistorique($user_id: ID!, $points: Long!) {
    updateUtilisateursMobile(
      input: {where: {id: $user_id}, data: {points: $points}}
    ) {
      utilisateursMobile {
        points
      }
    }
  }
`;

export const GET_HISTORIQUES = gql`
  query getHistorique {
    historiques {
      id
      user {
        id
        user_id
        first_name
        points
      }
      module {
        id
      }
      status
    }
  }
`;

export const CREATE_HISTORY = gql`
  mutation UpdateHistorique(
    $user_id: ID
    $module_id: ID
    $status: ENUM_HISTORIQUE_STATUS
  ) {
    createHistorique(
      input: {data: {user: $user_id, module: $module_id, status: $status}}
    ) {
      historique {
        id
        module {
          id
        }
      }
    }
  }
`;
