$(document).ready(() => {
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("food_order");
  sessionStorage.removeItem("merchant");
  window.location.href = "/";
});
