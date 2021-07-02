import fnIsValidCoordinates from "is-valid-coordinates"

const POIAPI = {
  fetchMondialRelaisPOI: async (coordinates) => {
    let response  = await fetch(process.env.REACT_APP_API_URL + '/mondial-relay/' + coordinates.lat + '/' + coordinates.long)
                         .then(res => res.json().then(data => {return data}))
    return response;
  }
}

export default POIAPI