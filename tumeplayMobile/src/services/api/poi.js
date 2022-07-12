const POIAPI = {
  fetchMondialRelaisPOI: async (apiUrl, coordinates) => {
    let response = await fetch(
      apiUrl +
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
