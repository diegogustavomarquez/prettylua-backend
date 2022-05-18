import { Router, Request, Response } from 'express';
import { Mascota } from '../models/mascota.model';

import Token from '../classes/token';
import { verificaToken } from '../middlewares/autenticacion';

const mascotaRoutes = Router();

// Crear un usuario
mascotaRoutes.post('/create', ( req: Request, res: Response ) => {

    const mascota = {
        nombre   : req.body.nombre,
        especie  : req.body.especie,
        raza     : req.body.raza,
        fechaNacimiento     : req.body.fechaNacimiento,
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
            especie         : mascotaDB.especie,
            raza            : mascotaDB.raza,
            fechaNacimiento : mascotaDB.fechaNacimiento,
            foto            : mascotaDB.foto,
            estado          : mascotaDB.estado,
            codigo          : mascotaDB.codigo
          }
            
       // });

        res.json({
            ok: true,
            mascota :mascotaDB
      // token: tokenUser
        });


    }).catch( err => {
        res.json({
            ok: false,
            err
        });
    });

});

// Actualizar Mascota--ver verfica token
mascotaRoutes.post('/update', verificaToken, (req: any, res: Response ) => {

    const mascota = {
        nombre   : req.body.nombre  || req.mascota.nombre,
        especie  : req.body.especie || req.mascota.especie,
        raza     : req.body.raza    || req.mascota.raza,
fechaNacimiento  : req.body.fechaNacimiento    || req.mascota.fechaNacimiento,
        foto     : req.body.foto   || req.mascota.foto,
        estado   : req.body.estado || req.mascota.estado,
        codigo   : req.body.codigo || req.mascota.codigo


    }

    Mascota.findByIdAndUpdate( req.Mascota._id, mascota, { new: true }, (err, mascotaDB) => {

        if ( err ) throw err;
        mascotaRoutes
        if ( !mascotaDB ) {
            return res.json({
                ok: false,
                mensaje: 'No existe la mascota con ese ID'
            });
        }

        const mascota = {
            _id             : mascotaDB._id,
            nombre          : mascotaDB.nombre,
            especie         : mascotaDB.especie,
            raza            : mascotaDB.raza,
            fechaNacimiento : mascotaDB.fechaNacimiento,
            foto            : mascotaDB.foto,
            estado          : mascotaDB.estado,
            codigo          : mascotaDB.codigo    
        
        }
        res.json({
            ok: true,
            //token: tokenUser
            mascota : mascotaDB
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