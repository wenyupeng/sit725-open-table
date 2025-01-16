const session = require("express-session");

const sessionAuth = session({
  secret: "sit725", // encrypt cookie
  name: "session", // cookie name
  resave: false,
  rolling: false,
  cookie: {
    maxAge: 5 * 60 * 1000, // expired time
  },
});

module.exports = sessionAuth;
