const ResponsesAPI = {
  saveResponseMobile: async (
    apiUrl,
    response,
    question,
    utilisateurs_mobile,
  ) => {
    const res = await fetch(apiUrl + '/responses-mobiles', {
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
