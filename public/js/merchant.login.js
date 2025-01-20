$(document).ready(function () {
  $("#login-btn").click(() => {
    let phone = $("#icon_telephone").val();
    if (!phone) {
      // eslint-disable-next-line no-undef
      M.toast({ html: "phone could not be null" });
      return;
    }

    let pwd = $("#icon_prefix").val();
    if (!pwd) {
      // eslint-disable-next-line no-undef
      M.toast({ html: "password could not be null" });
      return;
    }

    let loginObj = {
      phone: phone,
      pwd: window.btoa(pwd),
    };

    $.ajax({
      url: "/api/merchant/login",
      type: "post",
      data: loginObj,
      success: (result) => {
        if (result.success) {
          console.log(result);
        }
      },
    });
  });
});
