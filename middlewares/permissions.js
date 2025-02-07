const jwt = require("jsonwebtoken");
const permissions = (req, res, next) => {
  let user = req.auth

  if (!user) {
    return res.status(401).json({ error: "Invalid token" });
  }
  req.session.user = user;
  next();
};
module.exports = permissions;
