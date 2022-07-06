import {gql} from '@apollo/client';

export const GET_SURVEY_BY_USER = gql`
  query getReferentSurvey($utilisateurs_mobile: ID) {
    referentSurveys(where: {utilisateurs_mobile: $utilisateurs_mobile}) {
      id
    }
  }
`;

export const CREATE_REFERENT_INTENTION = gql`
  mutation createSurveyReferent(
    $is_interested: Boolean
    $detailed_informations: String
    $utilisateurs_mobile: ID
  ) {
    createReferentSurvey(
      input: {
        data: {
          is_interested: $is_interested
          detailed_informations: $detailed_informations
          utilisateurs_mobile: $utilisateurs_mobile
        }
      }
    ) {
      referentSurvey {
        id
      }
    }
  }
`;


