import { Router, Request, Response } from 'express';
import { Rol } from '../models/rol.model';
import bcrypt from 'bcrypt';
import Token from '../classes/token';
import { verificaToken } from '../middlewares/autenticacion';

const rolesRoutes = Router();

/**
* Search rol by string profile
**/
rolesRoutes.get('/rolesByProfile', [ verificaToken ], ( req: Request, res: Response ) => {

    const profileDesc = req.query.profile;
    Rol.find({ perfil: profileDesc }, ( err: any, rolDB: any ) => {
        res.json({
            ok: true,
            token: tokenUser,
            rolDB
        });
    }).catch( err => {
         res.status(500).json({
             ok: false,
             err
         });
     });

});


/**
* Create rol
**/
rolesRoutes.post('/createRol',  [ verificaToken ],( req: Request, res: Response ) => {

    const rolToCreate = {
        nombre   : req.body.nombre,
        perfil   : req.body.perfil
    };

    Rol.create( rolToCreate ).then( rolDB => {
        const newRol = {
            _id: rolDB._id,
            nombre: rolDB.nombre,
            perfil: rolDB.perfil
        };
        res.status(201).json({
            ok: true,
            message: "Se ha creado el rol.",
            rol: newRol
        });
    }).catch( err => {
        res.status(500).json({
            ok: false,
            err
        });
    });
});


export default rolesRoutes;