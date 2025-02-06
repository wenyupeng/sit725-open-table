const session = require("express-session");
const { createClient } = require("redis");
const { RedisStore } = require("connect-redis");

const config = require("../config/env.config");

let redisStore;
if (config.redisUrl) {
  const redisClient = createClient({
    url: config.redisUrl,
  });
  redisClient.connect().catch(console.error);
  redisStore = new RedisStore({
    client: redisClient,
    prefix: "skipysession:",
  });
}

const sessionAuth = session({
  secret: "sit725", // encrypt cookie
  name: "session", // cookie name
  resave: false,
  rolling: false,
  cookie: {
    maxAge: 60 * 60 * 1000, // expired time
  },
  ...(redisStore ? { store: redisStore } : {}),
});

const attachUserToLocals = async (req, res, next) => {
  if (req.session.user) {
    const user = req.session.user;
    res.locals.user = user ? user : null;
  } else {
    res.locals.user = null;
  }
  next();
};

const ensureAuthenticated = (req, res, next) => {
  if (!req.session.user || !req.session) {
    console.log(
      `[Access Denied] Unauthenticated user tried to access: ${req.originalUrl}`,
    );
    return res.redirect("/user/login"); // Redirect to login if not authenticated
  }
  next(); // Proceed to the next middleware or route handler if authenticated
};

const ensureMerchantAuthenticated = (req, res, next) => {
  if (!req.session?.user?.merchant) {
    console.log(
      `[Access Denied] Unauthenticated user tried to access: ${req.originalUrl}`,
    );
    return res.redirect("/merchant-dashboard/login");
  }
  next();
};

module.exports = {
  sessionAuth,
  attachUserToLocals,
  ensureAuthenticated,
  ensureMerchantAuthenticated,
};
