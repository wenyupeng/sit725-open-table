// eslint-disable-next-line no-undef
const Materialize = M;

$(document).ready(() => {
  $("#login-btn").click(() => {
    const username = $("#username").val().trim();
    const password = $("#password").val().trim();

    // Input validation
    if (!username || !password) {
      Materialize.toast({ html: "Please fill in all fields." });
      return;
    }

    let loginData = { username, password };

    // Disable button to prevent multiple clicks
    $("#login-btn").prop("disabled", true);

    $.ajax({
      url: "/api/auth/login",
      type: "POST",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(loginData),
      success: (response) => {
        let result = typeof response === "string" ? JSON.parse(response) : response;

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
          window.location.href = nextPage ? nextPage : "/";
        } else {
          Materialize.toast({ html: "Login failed: " + (result.message || "please try again") });
        }
      },
      error: (xhr, status, error) => {
        const response = xhr.responseJSON;
        const message = response && response.message ? response.message : "An unexpected error occurred. Please login with the right credentials";
        Materialize.toast({ html: message });
      },
      complete: () => {
        // Re-enable the button
        $("#login-btn").prop("disabled", false);
      },
    });
  });
});
