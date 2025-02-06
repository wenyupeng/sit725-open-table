const renderAdminHomePage = async (req, res) => {
  res.render("./admin/admin", { pageTitle: "adminManagement", message: null });
};

const renderAdminLoginPage = async (req, res) => {
  res.render("./admin/login_admin", {
    pageTitle: "Admin Login",
    message: null,
  });
};

module.exports = {
  renderAdminHomePage,
  renderAdminLoginPage,
};
