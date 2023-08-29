module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "bookshelf",
      settings: {
        client: "postgres",
        host: env("DATABASE_HOST", "127.0.0.1"),
        port: env.int("DATABASE_PORT", 5432),
        database: env("DATABASE_NAME", "tumeplay_dev"),
        username: env("DATABASE_USERNAME", "db_user"),
        password: env("DATABASE_PASSWORD", "Mjolnir64"),
        ssl: getSslConfig() 
      },
      options: {},
    },
  },
});


function getSslConfig() {
  if (env.bool("DATABASE_SSL", false)) {
    return {rejectUnauthorized: false} // For self-signed certificates
  } 
  return false;
}
