const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  appUrl: process.env.APP_URL,
  port: process.env.PORT || 3000,

  dbUrl: process.env.MONGO_URL,

  jwtSecret: process.env.JWT_SECRET,

  customerAppHostname: process.env.CUSTOMER_APP_HOSTNAME,
  merchantAppHostname: process.env.MERCHANT_APP_HOSTNAME,
  adminAppHostname: process.env.ADMIN_APP_HOSTNAME,
};
