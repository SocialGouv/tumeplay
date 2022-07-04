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

export const CREATE_REFERENT_INTENTION = gql`
  mutation createSurveyReferent(
    $is_interested: Boolean
    $detailed_informations: String
  ) {
    createReferentSurvey(
      input: {
        data: {
          is_interested: $is_interested
          detailed_informations: $detailed_informations
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
