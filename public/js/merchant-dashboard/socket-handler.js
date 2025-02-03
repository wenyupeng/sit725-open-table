/* eslint-disable no-undef */
const Materialize = M;

function formatDate(date) {
  console.log('DATE:: ', date)
  if (!(date instanceof Date) || isNaN(date)) {
      throw new Error("Invalid date");
  }

  const pad = (num) => num.toString().padStart(2, '0');

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1); // Months are zero-based
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

document.addEventListener("DOMContentLoaded", function () {
  const user = getUserSession();
  if (user?._id) {
    const token = user.token.split(" ")[1];
    const socket = io({ query: `token=${token}` });

    socket.on("connect", () => {
      console.log("socket connected");
    });

    socket.on(`user-${user._id}`, (message) => {
      console.log("receive user room: ", message);
    });

    if (user.merchant) {
      console.log(`[socket-handler] listen to new-booking`)
      socket.on('new-booking', (message) => {
        const booking = JSON.parse(message)
        console.log("receive merchant room: ", booking);
        Materialize.toast({ html: `You've got new booking for ${formatDate(new Date(booking.bookingDateTime))}`, classes: "green darken-1" });
      });
    }

    socket.on('dummy-test', (message) => console.log(message))

    socket.on('dumdum', (message) => console.log(message))
  }
});
