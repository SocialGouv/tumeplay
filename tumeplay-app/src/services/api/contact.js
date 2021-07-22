const ContactsAPI = {
  postContact: async userAdress => {
    await fetch(process.env.REACT_APP_API_URL + '/contacts', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userAdress.firstName,
        email: userAdress.emailAdress,
        zipcode: userAdress.zipCode,
        box: userAdress.box_id,
        type: userAdress.type
      }),
    });
  },
};

export default ContactsAPI;
