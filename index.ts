import Server from './classes/server';
import mongoose from 'mongoose';

import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

import userRoutes from './routes/usuario';
import postRoutes from './routes/post';
import emailRoutes from './routes/email';

import cors from 'cors';
require('dotenv').config();

const port = process.env.PORT || 3000;
const urlDataBase = process.env.DATABASE || 'mongodb://mongodev:secret@localhost:27017/prettyluadb?authSource=admin';

const server = new Server();

console.log('urlDataBase' + urlDataBase);

 /*
server.app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-COntrol-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
})*/

//habilitar cors
server.app.use( cors({origin:true, credentials:true}));


// Body parser
server.app.use( bodyParser.urlencoded({ extended: true }));
server.app.use( bodyParser.json() );


// FileUpload
server.app.use( fileUpload({ useTempFiles: true }) );

  
// Rutas de mi app
server.app.use('/user', userRoutes );
server.app.use('/posts', postRoutes );
server.app.use('/email', emailRoutes );


// Conectar DB
/* mongoose.connect('mongodb://mongodev:secret@localhost:27017/prettyluadb?authSource=admin', ( err ) => {
   if ( err ) throw err;
   console.log('Base de datos ONLINE');
}); */

mongoose.default.connect(urlDataBase, (err) => {
    if (err)
        throw err;
    console.log('Base de datos ONLINE');
});

// mongoose.connect('mongodb://localhost:27017', {
//     dbName: 'prettyluadb',
//     auth: {
//       password: 'secret',
//       username: 'mongodev',
//     },
//   }, ( err ) => {
//    if ( err ) throw err;
//    console.log('Base de datos ONLINE');
// });

server.app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto ${ port }`);
});
// Levantar express
// server.start( () => {
//     console.log(`Servidor corriendo en puerto ${ server.port }`);
// });