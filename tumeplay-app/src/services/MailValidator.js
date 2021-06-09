const MailValidator = {
  emailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

  validateMail: email => {
    try {
      return MailValidator.emailRegex.test(email);
    } catch (e) {
      throw Error(e);
    }

    return false;
  },
};
export default MailValidator;
