import mongoose from 'mongoose';

import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

import userRoutes from './routes/usuario';
import postRoutes from './routes/post';
import emailRoutes from './routes/email';
import petRoutes from './routes/mascota';
import rolesRoutes from './routes/rol';
import profileRoutes from './routes/profile';
import cors from 'cors';

const express = require('express');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 3000;
const urlDataBase = process.env.DATABASE || 'mongodb://mongodev:secret@localhost:27017/prettyluadb?authSource=admin';

console.log('port: ' + port);
console.log('urlDataBase: ' + urlDataBase);

//habilitar cors
app.use( cors({origin:true, credentials:true}));


// Body parser
app.use( bodyParser.urlencoded({ extended: true }));
app.use( bodyParser.json() );


// FileUpload
app.use( fileUpload({ useTempFiles: true }) );

// Rutas de mi app

app.use('/user', userRoutes );
app.use('/posts', postRoutes );
app.use('/email', emailRoutes );
app.use('/pet', petRoutes );
app.use('/roles', rolesRoutes );
app.use('/profiles', profileRoutes );

mongoose.default.connect(urlDataBase, (err) => {
    if (err)
        throw err;
    console.log('Base de datos ONLINE');
});

// Levantar express
app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto ${ port }`);
});
