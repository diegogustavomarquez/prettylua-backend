import { Router, Request, Response } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
import { UsuarioSubscripcion } from '../models/usuarioSubscripcion.model';

const userSubscriptionRoutes = Router();

// Crear un usuario
userSubscriptionRoutes.post('', [verificaToken], (req: Request, res: Response) => {

    const userSubscription = {
        nombre:          req.body.nombre,
        cuitcuil:        req.body.cuitcuil,
        fechaInicio:     req.body.fechaInicio,
        responsable:     req.body.responsable,
        direccionFisica: req.body.direccionFisica,
        titularTarjeta:  req.body.titularTarjeta,
        prefijo:         req.body.prefijo,
        subfijo:         req.body.subfijo,
        caducidad:       req.body.caducidad,
        cvc:             req.body.cvc,
        userId:          req.body.userId
    };

    UsuarioSubscripcion.create(userSubscription).then(userSubscriptionDB => {
        res.status(201).json({
            ok: true,
            message: "Subscripcion creada.",
            userSubscription: userSubscriptionDB
        });
    }).catch(err => {
        res.status(500).json({
            ok: false,
            err
        });
    });
});

userSubscriptionRoutes.get('/userById', [ verificaToken ], ( req: any, res: Response ) => {

    UsuarioSubscripcion.find({userId:req.usuario._id}, ( err: any, userSubscriptionDB: any ) => {
        if ( err ) {
            res.status(500);
            throw err;
        } else if(!userSubscriptionDB || !userSubscriptionDB[0].userId){
            return res.status(404).json({
                ok: false,
                mensaje: 'No existe una subscripcion con ese ID'
            });
        }else {
            res.json({
                ok: true,
                user: userSubscriptionDB[0]
            });
        }
    })
});

export default userSubscriptionRoutes;