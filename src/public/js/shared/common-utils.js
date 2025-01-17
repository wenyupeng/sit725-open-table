/* eslint-disable no-unused-vars */
function getUserSession() {
    const elem = document.getElementById("user-data");
    const user = elem.getAttribute('value')
    return user ? JSON.parse(user) : null;
}