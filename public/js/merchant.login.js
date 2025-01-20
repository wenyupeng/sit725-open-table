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

        let loginObj ={
            phone: phone,
            pwd: window.btoa(pwd)
        }

        console.log(loginObj);

        $.ajax({
            url: '/api/merchant/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(loginObj),
            success: (res) => {
                let resData = JSON.parse(res);
                if(resData.status == '1'){
                    M.toast({ html: 'login successfully', classes: 'rounded' });
                    console.log(resData);
                }else{
                    M.toast({ html: `Error login: ${resData.message}`, classes: 'rounded' });
                }
            },
            error: (xhr, status, error) => {
                if(xhr.status == 400){
                    let msg = JSON.parse(xhr.responseText).message;
                    M.toast({ html: `Error login: ${msg}`, classes: 'rounded' });
                }else{
                    M.toast({ html: `Error login: ${xhr.responseText}`, classes: 'rounded' });
                }
            }
        });
    })
})