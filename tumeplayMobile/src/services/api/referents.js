const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const referentAPI = {
    fetchReferents: async (zone_id) => {
        let response = await fetch(REACT_APP_API_URL + '/referents?is_available=true&environnement=' + zone_id)
                             .then(res => res.json().then(data => {return data}));
        return response
    }
}

export default referentAPI;