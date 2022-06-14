import mongoose from 'mongoose';

import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

import cors from 'cors';

import userRoutes from './routes/usuario';
import postRoutes from './routes/post';
import emailRoutes from './routes/email';
import petRoutes from './routes/mascota';
import rolesRoutes from './routes/rol';
import profileRoutes from './routes/profile';
import userSubscriptionRoutes from './routes/usuarioSubscripcion';
import hcRoutes from './routes/historiaClinica';
import storeRoutes from './routes/store';

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
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


// FileUpload
app.use( fileUpload({ useTempFiles: true }) );

// Rutas de mi app

app.use('/user', userRoutes );
app.use('/posts', postRoutes );
app.use('/email', emailRoutes );
app.use('/pet', petRoutes );
app.use('/roles', rolesRoutes );
app.use('/profiles', profileRoutes );
app.use('/user-subscription', userSubscriptionRoutes );
app.use('/clinic', hcRoutes );
app.use('/store', storeRoutes );
app.use('/clinic', hcRoutes );

mongoose.default.connect(urlDataBase, (err) => {
    if (err)
        throw err;
    console.log('Base de datos ONLINE');
});

// Levantar express
app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto ${ port }`);
});
