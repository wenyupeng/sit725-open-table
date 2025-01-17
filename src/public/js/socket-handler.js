/* eslint-disable no-undef */

document.addEventListener("DOMContentLoaded", function() {
  const user = getUserSession();
  if (user?._id) {
    const token = user.token.split(' ')[1];
    const socket = io({ query: `token=${token}` });

    socket.on("connect", () => {
      console.log('socket connected')
    });

    socket.on(`user:${user._id}`, (message) => {
      console.log('receive user room: ', message)
    })

    socket.on(`merchant:${user._id}`, (message) => {
      console.log('receive merchant room: ', message)
    })
  }
});
