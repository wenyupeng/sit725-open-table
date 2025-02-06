module.exports = {
  nodeEnv: process.env.NODE_ENV,
  app: {
    host: process.env.APP_HOST || "localhost",
    port: process.env.APP_PORT || 3000,
  },
  mongo: {
    url: process.env.MONGO_URL,
  },
  redis: {
    url: process.env.REDIS_URL,
  },
  signKey: process.env.SIGN_KEY,
  email: {
    account: process.env.EMAIL_ACCOUNT,
    password: process.env.EMAIL_PASSWORD,
  },
};
