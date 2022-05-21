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
            return res.json({
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
                roles    : userDB.roles,
                perfil   : userDB.perfil

            });

            res.json({
                ok: true,
                token: tokenUser
            });

        } else {
            return res.json({
                ok: false,
                mensaje: 'Usuario/contraseña no son correctos ***'
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
        roles    : req.body.roles,
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
            roles    : userDB.roles,
            perfil   : userDB.perfil

        });

        res.json({
            ok: true,
            token: tokenUser
        });


    }).catch( err => {
        res.json({
            ok: false,
            err
        });
    });

});

// Actualizar usuario
userRoutes.post('/update', verificaToken, (req: any, res: Response ) => {

    const user = {
        nombre  : req.body.nombre || req.usuario.nombre,
        apellido: req.body.apellido || req.usuario.apellido,
        telefono: req.body.telefono || req.usuario.telefono,
        email   : req.body.email  || req.usuario.email,
        avatar  : req.body.avatar || req.usuario.avatar,
        roles   : req.body.roles || req.usuario.roles, 
        perfil  : req.body.perfil || req.usuario.perfil

    }

    Usuario.findByIdAndUpdate( req.usuario._id, user, { new: true }, (err, userDB) => {

        if ( err ) throw err;

        if ( !userDB ) {
            return res.json({
                ok: false,
                mensaje: 'No existe un usuario con ese ID'
            });
        }

        const tokenUser = Token.getJwtToken({
            _id: userDB._id,
            apellido : userDB.apellido,
            email    : userDB.email,
            telefono : userDB.telefono,
            avatar   : userDB.avatar,
            roles    : userDB.roles,
            perfil   : userDB.perfil
        });

        res.json({
            ok: true,
            token: tokenUser
        });


    });

});


userRoutes.get('/', [ verificaToken ], ( req: any, res: Response ) => {

    const usuario = req.usuario;

    res.json({
        ok: true,
        usuario
    });

});


export default userRoutes;