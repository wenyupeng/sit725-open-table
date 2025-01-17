const bcrypt = require("bcrypt");

const encryptPassword = function (value) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(value, 10, function (err, hash) {
      if (err) {
        return reject(err);
      }
      resolve(hash);
    });
  });
};

const comparePassword = function (value, enValue) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(value, enValue, function (err, same) {
      if (err) {
        return reject(err);
      }
      resolve(same);
    });
  });
};

module.exports = {
  encryptPassword,
  comparePassword,
};
