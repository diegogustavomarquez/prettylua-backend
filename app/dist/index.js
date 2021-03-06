"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const post_1 = __importDefault(require("./routes/post"));
const email_1 = __importDefault(require("./routes/email"));
const mascota_1 = __importDefault(require("./routes/mascota"));
const rol_1 = __importDefault(require("./routes/rol"));
const profile_1 = __importDefault(require("./routes/profile"));
const usuarioSubscripcion_1 = __importDefault(require("./routes/usuarioSubscripcion"));
const historiaClinica_1 = __importDefault(require("./routes/historiaClinica"));
const store_1 = __importDefault(require("./routes/store"));
const subscription_1 = __importDefault(require("./routes/subscription"));
const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const urlDataBase = process.env.DATABASE || 'mongodb://mongodev:secret@localhost:27017/prettyluadb?authSource=admin';
console.log('port: ' + port);
console.log('urlDataBase: ' + urlDataBase);
//habilitar cors
app.use((0, cors_1.default)({ origin: true, credentials: true }));
// Body parser
app.use(body_parser_1.default.json({ limit: '50mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
// FileUpload
app.use((0, express_fileupload_1.default)({ useTempFiles: true }));
// Rutas de mi app
app.use('/user', usuario_1.default);
app.use('/posts', post_1.default);
app.use('/email', email_1.default);
app.use('/pet', mascota_1.default);
app.use('/roles', rol_1.default);
app.use('/profiles', profile_1.default);
app.use('/user-subscription', usuarioSubscripcion_1.default);
app.use('/clinic', historiaClinica_1.default);
app.use('/store', store_1.default);
app.use('/subscription', subscription_1.default);
mongoose_1.default.default.connect(urlDataBase, (err) => {
    if (err)
        throw err;
    console.log('Base de datos ONLINE');
});
// Levantar express
app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto ${port}`);
});
