const ContactsAPI = {
  postContact: async (url, userAdress) => {
    await fetch(url + '/contacts', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userAdress.first_name,
        email: userAdress.email,
        zipcode: userAdress.zipCode,
        box: userAdress.box_id,
        type: userAdress.type,
      }),
    });
  },
};

export default ContactsAPI;
