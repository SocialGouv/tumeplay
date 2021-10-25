const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
const REACT_APP_ZONE = process.env.REACT_APP_ZONE;


const referentAPI = {
    fetchReferents: async () => {
        let response = await fetch(REACT_APP_API_URL + '/referents?is_available=true&environnement=' + (REACT_APP_ZONE === 'metropole' ? 1 : 2))
                             .then(res => res.json().then(data => {return data}));
        return response
    }
}

export default referentAPI;