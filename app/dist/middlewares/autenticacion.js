"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificaToken = void 0;
const token_1 = __importDefault(require("../classes/token"));
const http_status_codes_1 = require("http-status-codes");
const verificaToken = (req, res, next) => {
    const userToken = req.get('x-token') || '';
    token_1.default.comprobarToken(userToken)
        .then((decoded) => {
        console.log('Decoded', decoded);
        req.usuario = decoded.usuario;
        next();
    })
        .catch(err => {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED);
        res.json({
            ok: false,
            mensaje: 'Token no es correcto',
            //                 userToken: req.usuario
        });
    });
};
exports.verificaToken = verificaToken;
