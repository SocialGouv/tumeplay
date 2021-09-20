import axios from "axios";

const URL = 'http://localhost:1337'
const OrdersAPI = {
  getOrders: (token, searchParam) => {
    return axios.get(`${URL}/commandes?delivery=pickup&delivery=home${searchParam}`, {headers: {
      Authorization: `Bearer ${token}`
    }});
  },
  countOrders: (token) => {
    return axios.get(`${URL}/commandes/count`, {headers: {
      Authorization: `Bearer ${token}`
    }});
  },
  printMondialRelayPDF: (token, ids) => {
    return axios.post(`${URL}/mondial-relay/merge-pdf`, {ids: ids}, {headers: {
      Authorization: `Bearer ${token}`
    }});
  },
  printColissimoPDF: (token, ids) => {
    return axios.post(`${URL}/colissimo/generate-pdf`, {ids: ids}, {headers: {
      Authorization: `Bearer ${token}`
    }});
  },
  setOrdersToSent: (token, orders) => {
    return axios.put(`${URL}/commandes/update/multiple`, {orders: orders}, {headers: {
      Authorization: `Bearer ${token}`
    }});
  },
	countThisWeekOrders: (token) => {
		var ourDate = new Date();
		const oneWeekAgo = ourDate.getDate() - 7;
		ourDate.setDate(oneWeekAgo);
    return axios.get(`${URL}/commandes/count`, {
			params: {
				created_at_gte: ourDate.getTime()
			},
			headers: {
   			Authorization: `Bearer ${token}`
    	}
		});
	},
	countLastWeekOrders: (token) => {
		var lastWeek = new Date();
		var lastLastWeek = new Date();
		const lw = lastWeek.getDate() - 7;
		const llw = lastLastWeek.getDate() - 14;
		lastWeek.setDate(lw);
		lastLastWeek.setDate(llw);
    return axios.get(`${URL}/commandes/count`, {
			params: {
				created_at_gte: lastLastWeek.getTime(),
				created_at_lte: lastWeek.getTime()
			},
			headers: {
   			Authorization: `Bearer ${token}`
    	}
		});
	},
	countPendingOrders: (token) => {
    return axios.get(`${URL}/commandes/count`, {
			params: {
				sent_ne: true
			},
			headers: {
   			Authorization: `Bearer ${token}`
    	}
		});
	},
	countTodayPendingOrders: (token) => {
		var ourDate = new Date();
		const oneWeekAgo = ourDate.getDate() - 1;
		ourDate.setDate(oneWeekAgo);
    return axios.get(`${URL}/commandes/count`, {
			params: {
				sent_ne: true,
				created_at_gte: ourDate.getTime()
			},
			headers: {
   			Authorization: `Bearer ${token}`
    	}
		});
	}
}

export default OrdersAPI;
