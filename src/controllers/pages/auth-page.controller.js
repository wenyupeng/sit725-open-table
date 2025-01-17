exports.renderRegister = [
  (_, res) => {
    res.render("./login/register", { pageTitle: "Register", message: null });
  },
];

exports.renderLogin = [
  (_, res) => {
    res.render("./login/login", { pageTitle: "Login", message: null });
  },
];
