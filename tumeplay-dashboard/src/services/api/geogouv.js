import axios from "axios";

const GeoGouvApi = {
  getCities: (name) => {
    return axios.get(`https://geo.api.gouv.fr/communes`,
     {
			 params: {
				 nom: name
			 }
		 });
  }
}

export default GeoGouvApi;
