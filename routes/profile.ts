import { Router, Request, Response } from 'express';
import { Profile } from '../models/profile.model';
import bcrypt from 'bcrypt';
import Token from '../classes/token';
import { verificaToken } from '../middlewares/autenticacion';

const profileRoutes = Router();


profileRoutes.get('/', [ verificaToken ], ( req: any, res: Response ) => {

    //const profile = req.perfil;
    Profile.find(( err: any, profileDB: any ) => {
        const profile = {
            _id      : profileDB._id,
            nombre   : profileDB.nombre,
            roles    : profileDB.roles
        }
        if ( err ) {
            res.status(500);
            throw err;
        } else {
            res.json({
                ok: true,
                profile: profileDB
            });
        }
    })

});


export default profileRoutes;