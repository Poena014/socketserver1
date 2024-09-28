

class Sockets {

    constructor( io) {
        this.io=io;
        
        this.socketEvent();
    }

    socketEvent() {
        this.io.on('connection', (socket) => {
            console.log('Se ha conectado');
            socket.on('mensaje-to-server', (msg) => {
                console.log('el cliente dice: ' + JSON.stringify(msg));
                this.io.emit('mensaje-from-server', msg);
            });

        });

    }

}

module.exports = Sockets;