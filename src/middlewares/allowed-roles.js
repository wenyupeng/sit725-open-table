const allowedRoles = (roles = ["customer"]) => {
  return (req, res, next) => {
    console.log("EXPECTED ROLE ", roles, req.session?.user?.role);
    if (req.session?.user && roles.includes(req.session?.user?.role)) {
      next();
    } else {
      res.status(401).render("./error/401", { pageTitle: "Unauthorized" });
    }
  };
};

module.exports = allowedRoles;
