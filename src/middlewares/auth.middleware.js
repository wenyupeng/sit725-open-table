const jwt = require("jsonwebtoken");

const config = require("../config/config");
const { UnauthorizedError } = require("../utils/error.util");
const { roles } = require("../utils/role.util");

const authenticate = (role = roles.CUSTOMER) => {
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
      throw new UnauthorizedError(
        "You are not authorized to perform this action",
      );
    }

    try {
      var decodedUser = jwt.verify(token, config.jwtSecret);
      if (!decodedUser || role !== decodedUser.role) {
        throw new UnauthorizedError(
          "You are not authorized to perform this action",
        );
      }
      res.user = decodedUser;
      next();
    } catch {
      throw new UnauthorizedError(
        "You are not authorized to perform this action",
      );
    }
  };
};

module.exports = authenticate;
