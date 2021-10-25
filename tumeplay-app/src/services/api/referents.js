const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const referentAPI = {
    fetchReferents: async () => {
        let response = await fetch(REACT_APP_API_URL + '/referents?is_available=true')
                             .then(res => res.json().then(data => {return data}));
        return response
    }
}

export default referentAPI;