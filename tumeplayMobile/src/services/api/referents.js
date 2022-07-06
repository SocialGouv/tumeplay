const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
import {gql} from '@apollo/client';

const referentAPI = {
  fetchReferents: async zone_id => {
    let response = await fetch(
      REACT_APP_API_URL +
        '/referents?is_available=true&environnement=' +
        zone_id,
    ).then(res =>
      res.json().then(data => {
        return data;
      }),
    );
    return response;
  },
};

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

export default referentAPI;
