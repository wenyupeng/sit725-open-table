const renderRegister = [
  (_, res) => {
    res.render("./login/register", { pageTitle: "Register", message: null });
  },
];

const renderLogin = [
  (_, res) => {
    res.render("./login/login", { pageTitle: "Login", message: null });
  },
];

const renderMerchantDashboardLogin = (_, res) => {
  res.render("./merchant-dashboard/login", {
    pageTitle: "Merchant Dashboard",
    message: null,
  });
};

module.exports = {
  renderLogin,
  renderRegister,
  renderMerchantDashboardLogin,
};
