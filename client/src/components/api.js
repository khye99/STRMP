import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:3002');
function sendMsg(mesg, cb) {
    socket.on('getMsg', msg => cb(msg) );
    socket.emit('sendMsg', mesg);
}

// function sendMsg(cb) {
//     socket.on('getMsg', msg => cb(null, msg) );
//     socket.emit('sendMsg', 1000);
// }
export { sendMsg };