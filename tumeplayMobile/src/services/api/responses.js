import {REACT_APP_URL} from '@env';

const ResponsesAPI = {
  saveResponseMobile: async (response, question, utilisateurs_mobile) => {
    const res = await fetch(REACT_APP_URL + '/responses-mobiles', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        response,
        question,
        utilisateurs_mobile,
      }),
    });
    return res.ok;
  },
};

export default ResponsesAPI;
