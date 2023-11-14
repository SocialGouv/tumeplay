module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "smtp",
      providerOptions: {
        host: env("EMAIL_PROVIDER_HOST"), //SMTP Host
        port: env("EMAIL_PROVIDER_PORT"), //SMTP Port
        secure: env("EMAIL_PROVIDER_SECURE") === "true",
        username: env("EMAIL_PROVIDER_USERNAME"),
        password: env("EMAIL_PROVIDER_PASSWORD"),
        rejectUnauthorized: true,
        requireTLS: env("EMAIL_PROVIDER_TLS") === "true",
        connectionTimeout: 1,
      },
      settings: {
        from: env("EMAIL_PROVIDER_FROM"),
        replyTo: env("EMAIL_PROVIDER_REPLY_TO"),
      },
    },
  },
});
