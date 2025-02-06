const Materialize = M;

$(document).ready(() => {
  $("#login-btn").click(() => {
    // Fixed admin credentials
    const fixedEmail = "skipy@gmail.com";
    const fixedPassword = "skipy1234567";

    // Get adminname and password
    const adminname = $("#adminname").val();
    const password = $("#password").val();

    // Validate input fields
    if (!adminname || !password) {
      Materialize.toast({ html: "Please fill in all fields." });
      return;
    }

    // Check fixed credentials
    if (adminname === fixedEmail && password === fixedPassword) {
      // Redirect to admin.ejs
      window.location.href = "/admin";
    } else {
      // Show error message
      Materialize.toast({
        html: "Invalid email or password. Please try again.",
      });
    }
  });
});
