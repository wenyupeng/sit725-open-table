// eslint-disable-next-line no-undef
const Materialize = M;

$(document).ready(() => {
  $("#login-form").submit(async (e) => {
    e.preventDefault();

    const loginData = {
      username: $("#username").val(),
      password: $("#password").val(),
    };

    try {
      const response = await $.ajax({
        url: "/api/auth/login",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(loginData),
      });
      const result = response ? JSON.parse(response) : null;
      if (result.status === 1) {
        let data = result.data;
        let user = {
          id: data.id,
          username: data.username,
          email: data.email,
          phone: data.phone,
        };
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("token", data.token);

        let nextPage = sessionStorage.getItem("nextPage");
        sessionStorage.removeItem("nextPage");
        if (nextPage) {
          window.location.href = nextPage;
        } else {
          window.location.href = "/merchant-dashboard/bookings";
        }
      } else {
        Materialize.toast({ html: "login failed, please try again" });
      }
    } catch (err) {
      console.error(err.responseText);
      Materialize.toast({ html: "login failed, please try again" });
    }
  });
});
