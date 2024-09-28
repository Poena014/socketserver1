const express = require('express');
const http = require('http');
const socket = require('socket.io');

const accesos = require('cors');

const path = require('path');
const Sockets = require('./sockets');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //http server

        this.server = http.createServer(this.app);
        this.io = socket(this.server, {
            allowRequest: (req, callback) => {
                const noOriginHeader = req.headers.origin === undefined;
                callback(null, noOriginHeader); // only allow requests without 'origin' header
            }
        });

    }

    middlewares() {
        this.app.use(express.static(path.resolve(__dirname, '../public')));
        //CORS

        this.app.use(accesos());
    }

    configurarSockets() {
        new Sockets(this.io);
    }

    execute() {

        this.middlewares();
        this.configurarSockets();

        //Inicializar Server
        this.server.listen(this.port, () => {
            console.log('Server corriendo, en puerto: ', this.port);
        });

    }
}

module.exports = Server;