 const referentAPI = {
    fetchReferents: async () => {
        let response = await fetch(process.env.REACT_APP_API_URL + '/referents')
                             .then(res => res.json().then(data => {return data}));
        return response
    }
}

export default referentAPI;