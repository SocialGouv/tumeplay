module.exports = ({ env }) => ({
    email: {
      provider: 'smtp',
      providerOptions: {
        host: '', //SMTP Host
        port: 0, //SMTP Port
        secure: false,
        username: '',
        password: '',
        connectionTimeout: 1,
      },
      settings: {
        from: 'contact.tumeplay@fabrique.social.gouv.fr',
        replyTo: 'contact.tumeplay@fabrique.social.gouv.fr',
      },
    },
  });
