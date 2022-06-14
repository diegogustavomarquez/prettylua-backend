import { Router, Request, Response } from 'express';
import { HistoriaClinica } from '../models/historiaClinica.model';
import bcrypt from 'bcrypt';
import Token from '../classes/token';
import { verificaToken } from '../middlewares/autenticacion';
import {v4 as uuidv4} from 'uuid';

const hcRoutes = Router();
// Crear
hcRoutes.post('/add', ( req: Request, res: Response ) => {

    const hc = {
        codigo   : uuidv4(),
        petId    : req.body.petId,
        tipos    : req.body.tipos,
        descripcion : req.body.descripcion,
        adjuntos   : req.body.adjuntos,
        comentarios : req.body.comentarios,
        fecha   : new Date()
    };

    HistoriaClinica.create( hc ).then( hcDB => {
        res.status(201).json({
            ok: true,
            message: "Usuario creado.",
            data: hcDB
        });
    }).catch( err => {
        res.status(500).json({
            ok: false,
            err
        });
    });
});
/**
* Busca por id
**/
hcRoutes.get('/byId', [ verificaToken ], ( req: any, res: Response ) => {
    const hc = req.hc;
    HistoriaClinica.find({_id:req.hc._id}, ( err: any, hcDB: any ) => {
        const his = {
            _id: hcDB._id,
            codigo   : hcDB.codigo,
            petId    : hcDB.petId,
            tipos    : hcDB.tipos,
            descripcion : hcDB.descripcion,
            adjuntos : hcDB.adjuntos,
            comentarios: hcDB.comentarios,
            fecha   : hcDB.fecha
        }
        if ( err ) {
            res.status(500);
            throw err;
        } else {
            res.json({
                ok: true,
                data: hcDB
            });
        }
    })
});

/**
* Delete byId
**/
hcRoutes.delete('/delete', [ verificaToken ], ( req: any, res: Response ) => {
    const idParam = req.query.id;
    HistoriaClinica.findByIdAndDelete({_id: idParam}, ( err: any, hcDB: any) => {

        if ( !hcDB) {
            return res.status(404).json({
                ok: false,
                message: 'No existe registro con ese id: '+idParam
            });
        }
        res.json({
            ok: true,
            message : "Registro eliminado"
        });
    });

});


export default hcRoutes;