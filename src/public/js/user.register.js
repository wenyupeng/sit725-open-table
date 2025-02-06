// eslint-disable-next-line no-undef
const Materialize = M;

$(document).ready(() => {
  $("#createAccount").click(() => {
    var form = document.getElementById("userRegisterForm");
    var formData = new FormData(form);

    let registerDate = {};
    for (var [key, value] of formData.entries()) {
      registerDate[key] = value;
    }

    if (registerDate.password !== registerDate.confirmPassword) {
      Materialize.toast({ html: "Passwords do not match", classes: "rounded" });
      return;
    }

    $.ajax({
      url: "/api/auth/register",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(registerDate),
      success: (res) => {
        let resData = JSON.parse(res);
        if (resData.status == "1") {
          Materialize.toast({
            html: "Account created successfully, redirecting you back to the login page....",
            classes: "rounded",
          });
          document.getElementById("userRegisterForm").reset(); // Clear form
          setTimeout(() => (window.location.href = "/user/login"), 2000);
        } else {
          Materialize.toast({
            html: `Error creating account: ${resData.message}`,
            classes: "rounded",
          });
        }
      },
      error: (xhr) => {
        if (xhr.status == 400) {
          let msg = JSON.parse(xhr.responseText).message;
          Materialize.toast({
            html: `Error creating account: ${msg}`,
            classes: "rounded",
          });
        } else {
          Materialize.toast({
            html: `Error creating account: ${xhr.responseText}`,
            classes: "rounded",
          });
        }
      },
    });
  });
});
