import { Router, Request, Response } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
import { UsuarioSubscripcion } from '../models/usuarioSubscripcion.model';

const userSubscriptionRoutes = Router();

// Crear un usuario
userSubscriptionRoutes.post('', [ verificaToken ], ( req: Request, res: Response ) => {

    const userSubscription = {
        nombre   : req.body.nombre,
        userId   : req.body.userId
    };
    UsuarioSubscripcion.create( userSubscription ).then( userSubscriptionDB => {
        res.status(201).json({
            ok: true,
            message: "Subscripcion creada.",
            userSubscription: userSubscriptionDB
        });
    }).catch( err => {
        res.status(500).json({
            ok: false,
            err
        });
    });
});


export default userSubscriptionRoutes;