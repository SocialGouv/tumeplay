module.exports = ({ env }) => ({
  email: {
    provider: "smtp",
    providerOptions: {
      host: env("EMAIL_PROVIDER_HOST"),
      port: env("EMAIL_PROVIDER_PORT"),
      username: env("EMAIL_PROVIDER_USERNAME"),
      password: env("EMAIL_PROVIDER_PASSWORD"),
      rejectUnauthorized: true,
      requireTLS: "true",
      connectionTimeout: 1,
    },
    settings: {
      defaultFrom: env("EMAIL_PROVIDER_FROM"),
      defaultReplyTo: env("EMAIL_PROVIDER_REPLY_TO"),
    },
  },
});
