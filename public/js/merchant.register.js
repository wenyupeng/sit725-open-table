// eslint-disable-next-line no-undef
const Materialize = M;

$(document).ready(function () {
  $("#createMerchantBtn").click(function () {
    var form = document.getElementById("merchantRegisterForm");
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
      url: "/api/merchant/register",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(registerDate),
      success: (res) => {
        let resData = JSON.parse(res);
        if (resData.status == "1") {
          Materialize.toast({
            html: "Account created successfully",
            classes: "rounded",
          });
          window.location.href = "/merchant/login";
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
