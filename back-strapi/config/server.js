const forgotPasswordTemplate = require('./email-templates/forgot-password');

module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  api: env('DOMAIN_API'),
  url: env('URL'),
  admin: {
		forgotPassword: {
      emailTemplate: forgotPasswordTemplate,
    },
    auth: {
      secret: env('ADMIN_JWT_SECRET', '4ca677ef372e64d8c925d46dce9d75b2'),
    },
  },
  emails: {
    admin: env('EMAIL_CONFIG_ADMIN'),
    cat: env('EMAIL_CONFIG_CAT')
  },
  mondialRelay: {
    id: env('MONDIALRELAY_ID'),
    secret: env('MONDIALRELAY_SECRET')
  },
  cron: {
    enabled: true
  }
});
