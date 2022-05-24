"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_model_1 = require("../models/usuario.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../classes/token"));
const autenticacion_1 = require("../middlewares/autenticacion");
const userRoutes = (0, express_1.Router)();
// Login
userRoutes.post('/login', (req, res) => {
    const body = req.body;
    usuario_model_1.Usuario.findOne({ email: body.email }, (err, userDB) => {
        if (err)
            throw err;
        if (!userDB) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Usuario/contraseña no son correctos'
            });
        }
        if (userDB.compararPassword(body.password)) {
            const tokenUser = token_1.default.getJwtToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                apellido: userDB.apellido,
                email: userDB.email,
                telefono: userDB.telefono,
                avatar: userDB.avatar,
                perfil: userDB.perfil
            });
            res.json({
                ok: true,
                token: tokenUser
            });
        }
        else {
            return res.status(401).json({
                ok: false,
                mensaje: 'Usuario/contraseña no son correctos ***',
            });
        }
    });
});
// Crear un usuario
userRoutes.post('/create', (req, res) => {
    const user = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        telefono: req.body.telefono,
        perfil: req.body.perfil,
        password: bcrypt_1.default.hashSync(req.body.password, 10),
        avatar: req.body.avatar
    };
    usuario_model_1.Usuario.create(user).then(userDB => {
        const tokenUser = token_1.default.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            apellido: userDB.apellido,
            email: userDB.email,
            telefono: userDB.telefono,
            avatar: userDB.avatar,
            perfil: userDB.perfil
        });
        res.status(201).json({
            ok: true,
            message: "Usuario creado.",
            token: tokenUser,
            user: userDB
        });
    }).catch(err => {
        res.status(500).json({
            ok: false,
            err
        });
    });
});
// Actualizar usuario
userRoutes.post('/update', autenticacion_1.verificaToken, (req, res) => {
    const user = {
        nombre: req.body.nombre || req.usuario.nombre,
        apellido: req.body.apellido || req.usuario.apellido,
        telefono: req.body.telefono || req.usuario.telefono,
        password: bcrypt_1.default.hashSync(req.body.password, 10) || bcrypt_1.default.hashSync(req.usuario.password, 10),
        email: req.body.email || req.usuario.email,
        avatar: req.body.avatar || req.usuario.avatar,
        perfil: req.body.perfil || req.usuario.perfil
    };
    usuario_model_1.Usuario.findByIdAndUpdate(req.usuario._id, user, { new: true }, (err, userDB) => {
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No existe un usuario con ese ID'
            });
        }
        const tokenUser = token_1.default.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            apellido: userDB.apellido,
            password: userDB.password,
            email: userDB.email,
            telefono: userDB.telefono,
            avatar: userDB.avatar,
            perfil: userDB.perfil
        });
        if (err) {
            res.status(500);
            throw err;
        }
        else {
            res.json({
                ok: true,
                message: "Usuario Actualizado.",
                token: tokenUser,
                user: userDB
            });
        }
    });
});
userRoutes.get('/', [autenticacion_1.verificaToken], (req, res) => {
    const usuario = req.usuario;
    usuario_model_1.Usuario.find((err, userDB) => {
        const user = {
            _id: userDB._id,
            nombre: userDB.nombre,
            apellido: userDB.apellido,
            email: userDB.email,
            telefono: userDB.telefono,
            avatar: userDB.avatar,
            perfil: userDB.perfil
        };
        if (err) {
            res.status(500);
            throw err;
        }
        else {
            res.json({
                ok: true,
                user: userDB
            });
        }
    });
});
exports.default = userRoutes;
