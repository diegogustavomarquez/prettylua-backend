import { Router, Request, Response } from 'express';
import { Usuario } from '../models/usuario.model';
import bcrypt from 'bcrypt';
import Token from '../classes/token';
import { verificaToken } from '../middlewares/autenticacion';

const userRoutes = Router();

// Login
userRoutes.post('/login', (req: Request, res: Response ) => {
    const body = req.body;
    Usuario.findOne({ email: body.email }, ( err: any, userDB: any ) => {

        if ( err ) throw err;

        if ( !userDB ) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Usuario/contraseña no son correctos'
            });
        }

        if ( userDB.compararPassword( body.password ) ) {
            const tokenUser = Token.getJwtToken({
                _id: userDB._id,
                nombre   : userDB.nombre,
                apellido : userDB.apellido,
                email    : userDB.email,
                telefono : userDB.telefono,
                avatar   : userDB.avatar,
                perfil   : userDB.perfil

            });
            res.json({
                ok: true,
                token: tokenUser
            });

        } else {
            return res.status(401).json({
                ok: false,
                mensaje: 'Usuario/contraseña no son correctos ***',

            });
        }
    })
});


// Crear un usuario
userRoutes.post('/create', ( req: Request, res: Response ) => {

    const user = {
        nombre   : req.body.nombre,
        apellido : req.body.apellido,
        email    : req.body.email,
        telefono : req.body.telefono,
        perfil   : req.body.perfil,
        password : bcrypt.hashSync(req.body.password, 10),
        avatar   : req.body.avatar
    };

    Usuario.create( user ).then( userDB => {

        const tokenUser = Token.getJwtToken({
            _id: userDB._id,
            nombre   : userDB.nombre,
            apellido : userDB.apellido,
            email    : userDB.email,
            telefono : userDB.telefono,
            avatar   : userDB.avatar,
            perfil   : userDB.perfil

        });
        res.status(201).json({
            ok: true,
            message: "Usuario creado.",
            token: tokenUser,
            user: userDB
        });
    }).catch( err => {
        res.status(500).json({
            ok: false,
            err
        });
    });
});

// Actualizar usuario
userRoutes.post('/update', verificaToken, (req: any, res: Response ) => {
    const user = {
        nombre   : req.body.nombre                        || req.usuario.nombre,
        apellido : req.body.apellido                      || req.usuario.apellido,
        telefono : req.body.telefono                      || req.usuario.telefono,
        password : bcrypt.hashSync(req.body.password, 10) || bcrypt.hashSync(req.usuario.password,10),
        email    : req.body.email                         || req.usuario.email,
        avatar   : req.body.avatar                        || req.usuario.avatar,
        perfil  : req.body.perfil                         || req.usuario.perfil
    }

    Usuario.findByIdAndUpdate( req.usuario._id, user, { new: true }, (err, userDB) => {

        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No existe un usuario con ese ID'
            });
        }

        const tokenUser = Token.getJwtToken({
            _id: userDB._id,
            nombre   : userDB.nombre,
            apellido : userDB.apellido,
            password : userDB.password,
            email    : userDB.email,
            telefono : userDB.telefono,
            avatar   : userDB.avatar,
            perfil   : userDB.perfil
        });

        if ( err ){
            res.status(500);
            throw err;
        } else {
            res.json({
                ok: true,
                message: "Usuario Actualizado.",
                token: tokenUser,
                user: userDB
            });
        }
    });

});


userRoutes.get('/', [ verificaToken ], ( req: any, res: Response ) => {

    const usuario = req.usuario;
    Usuario.find(( err: any, userDB: any ) => {
        const user = {
            _id: userDB._id,
            nombre   : userDB.nombre,
            apellido : userDB.apellido,
            email    : userDB.email,
            telefono : userDB.telefono,
            avatar   : userDB.avatar,
            perfil   : userDB.perfil
        }
        if ( err ) {
            res.status(500);
            throw err;
        } else {
            res.json({
                ok: true,
                user: userDB
            });
        }
    })

});


export default userRoutes;