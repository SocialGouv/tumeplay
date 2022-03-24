import {REACT_APP_URL} from '@env';

const POIAPI = {
  fetchMondialRelaisPOI: async coordinates => {
    let response = await fetch(
      REACT_APP_URL +
        '/mondial-relay/' +
        coordinates.latitude +
        '/' +
        coordinates.longitude,
    ).then(res =>
      res.json().then(data => {
        return data;
      }),
    );
    return response;
  },
};

export default POIAPI;
