import { Router, Request, Response } from 'express';
import { Mascota } from '../models/mascota.model';
import bcrypt from 'bcrypt';
import Token from '../classes/token';
import { verificaToken } from '../middlewares/autenticacion';
import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';
const mascotaRoutes = Router();

/**
* Create pet
**/
mascotaRoutes.post('/create',( req: Request, res: Response ) => {

    const mascota = {
        nombre   : req.body.nombre,
        sexo     : req.body.sexo,
        raza     : req.body.raza,
        anio     : req.body.anio,
        mes      : req.body.mes,
        foto     : req.body.foto,
        estado   : req.body.estado,
        codigo   : req.body.codigo // va?
 
 
    };
//cuerpo cuando se resuelva la promesa
    Mascota.create( mascota ).then( mascotaDB => {
 
       // const tokenUser = Token.getJwtToken({
          const mascota = {
            _id             : mascotaDB._id,
            nombre          : mascotaDB.nombre,
            sexo            : mascotaDB.sexo,
            raza            : mascotaDB.raza,
            anio            : mascotaDB.anio,
            mes             : mascotaDB.mes,
            foto            : mascotaDB.foto,
            estado          : mascotaDB.estado,
            codigo          : mascotaDB.codigo
          }
       // });
        res.status(201).json({
            ok: true,
            token: mascota
        });
    }).catch( err => {
        res.status(500).json({
            ok: false,
            err
        });
    });

});

// Actualizar Mascota--ver verfica token
mascotaRoutes.post('/update', verificaToken, (req: any, res: Response ) => {

    const mascota = {
        nombre   : req.body.nombre  || req.mascota.nombre,
        sexo     : req.body.especie || req.mascota.sexo,
        raza     : req.body.raza    || req.mascota.raza,
        anio     : req.body.anio    || req.mascota.anio,
        mes      : req.body.mes    || req.mascota.mes,
        foto     : req.body.foto   || req.mascota.foto,
        estado   : req.body.estado || req.mascota.estado,
        codigo   : req.body.codigo || req.mascota.codigo

    }

    Mascota.findByIdAndUpdate( req.Mascota._id, mascota, { new: true }, (err, mascotaDB) => {

        if ( err ) throw err;
        mascotaRoutes
        if ( !mascotaDB ) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No existe la mascota con ese ID'
            });
        }

        const mascota = {
            _id             : mascotaDB._id,
            nombre          : mascotaDB.nombre,
            sexo            : mascotaDB.sexo,
            raza            : mascotaDB.raza,
            anio            : mascotaDB.anio,
            mes             : mascotaDB.mes,
            foto            : mascotaDB.foto,
            estado          : mascotaDB.estado,
            codigo          : mascotaDB.codigo    
        
        }
        res.json({
            ok: true,
            token: mascota,
           // mascota : mascotaDB
            message:"Mascota actualizada."
        });
    });

});
// ver este
mascotaRoutes.get('/', [ verificaToken ], ( req: any, res: Response ) => {

    const mascota = req.mascota;

    res.json({
        ok: true,
        mascota
    });

});


export default mascotaRoutes;