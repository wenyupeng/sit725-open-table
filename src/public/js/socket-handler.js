// eslint-disable-next-line no-undef
let socket = io();
socket.on('number', (msg) => {
    console.log('Receive Random number: ' + msg);
    // eslint-disable-next-line no-undef
    M.toast({html: msg})
})