const ContactsAPI = {
  postContact:  async userAdress => {
    await fetch('http://localhost:1337/contacts', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userAdress.firstName,
        email: userAdress.emailAdress,
      }),
    });
  },
};

export default ContactsAPI;