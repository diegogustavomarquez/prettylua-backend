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
            rolDB
        });
    })

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
        res.json({
            ok: true,
            token: newRol
        });
    }).catch( err => {
        res.json({
            ok: false,
            err
        });
    });
});


export default rolesRoutes;