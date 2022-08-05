const express = require('express')
const cors = require('cors');
const { socketController } = require('../sockets/controller');

const app = express()

class Server{
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);
        this.paths = {
            auth: '/api/auth',
            usuarios: '/api/usuarios',
            categorias: '/api/categorias',
            productos: '/api/productos',
            buscar: '/api/buscar',
            uploads: '/api/uploads'
        }

        //Middlewares
        this.middlewares();
        // Rutas de mi aplicacion
        this.routes();
        //Sockets
        this.sockets();
    }
    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        //CORS
        this.app.use(cors());
        //Parseo y lectura del body
        this.app.use(express.json());
        //Directorio publico
        this.app.use( express.static('public'))
    }
    routes(){
        //this.app.use(this.paths.usuarios, require('../routes/usuarios')) 
    }
    listen(){
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port)
        })
    }
    sockets(){
        this.io.on('connection', socketController);
    }
}

module.exports = Server;