$(document).ready(() => {
    $('#createAccount').click(() => {
        var form = document.getElementById('userRegisterForm');
        var formData = new FormData(form);

        let registerDate = {};
        for (var [key, value] of formData.entries()) {
            registerDate[key] = value;
        }

        if (registerDate.password !== registerDate.confirmPassword) {
            M.toast({ html: 'Passwords do not match', classes: 'rounded' });
            return;
        }

        $.ajax({
            url: '/api/auth/register',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(registerDate),
            success: (res) => {
                let resData = JSON.parse(res);
                if(resData.status == '1'){
                    M.toast({ html: 'Account created successfully', classes: 'rounded' });
                    window.location.href = '/user/login';
                }else{
                    M.toast({ html: `Error creating account: ${resData.message}`, classes: 'rounded' });
                }
            },
            error: (xhr, status, error) => {
                if(xhr.status == 400){
                    let msg = JSON.parse(xhr.responseText).message;
                    M.toast({ html: `Error creating account: ${msg}`, classes: 'rounded' });
                }else{
                    M.toast({ html: `Error creating account: ${xhr.responseText}`, classes: 'rounded' });
                }
            }
        });
    });

});