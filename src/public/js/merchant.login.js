// eslint-disable-next-line no-undef
const Materialize = M;

$(document).ready(function () {
  $("#login-btn").click(() => {
    let phone = $("#icon_telephone").val();
    if (!phone) {
      Materialize.toast({ html: "phone could not be null" });
      return;
    }

    let pwd = $("#icon_prefix").val();
    if (!pwd) {
      Materialize.toast({ html: "password could not be null" });
      return;
    }

    let loginObj = {
      phone: phone,
      pwd: window.btoa(pwd),
    };

    console.log(loginObj);

    $.ajax({
      url: "/api/merchant/login",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(loginObj),
      success: (res) => {
        let resData = JSON.parse(res);
        if (resData.status == "1") {
          Materialize.toast({ html: "login successfully", classes: "rounded" });
          console.log(resData);
        } else {
          Materialize.toast({
            html: `Error login: ${resData.message}`,
            classes: "rounded",
          });
        }
      },
      error: (xhr) => {
        if (xhr.status == 400) {
          let msg = JSON.parse(xhr.responseText).message;
          Materialize.toast({
            html: `Error login: ${msg}`,
            classes: "rounded",
          });
        } else {
          Materialize.toast({
            html: `Error login: ${xhr.responseText}`,
            classes: "rounded",
          });
        }
      },
    });
  });
});
