import { Router, Request, Response } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
import { Store } from '../models/store.model';

const storeRoutes = Router();

// Crear un store
storeRoutes.post('', [verificaToken], (req: Request, res: Response) => {

    const store = {
        nombre:             req.body.nombre,
        direccion:          req.body.direccion,
        codigoPostal:       req.body.codigoPostal,
        localidad:          req.body.localidad,
        provincia:          req.body.provincia,
        servicios:          req.body.servicios,
        dias:               req.body.dias,
        esDeCorrido:        req.body.esDeCorrido,
        horarioDesde:       req.body.horarioDesde,
        horarioHasta:       req.body.horarioHasta,
        horarioTardeDesde:  req.body.horarioTardeDesde,
        horarioTardeHasta:  req.body.horarioTardeHasta,
        es24hs:             req.body.es24hs,
        descripcion:        req.body.descripcion,
        promocion:          req.body.promocion,
        telefono :          req.body.telefono,
        userId :            req.body.userId
    };

    Store.create(store).then(storeDB => {
        res.status(201).json({
            ok: true,
            message: "Store creado.",
            data: storeDB
        });
    }).catch(err => {
        res.status(500).json({
            ok: false,
            err
        });
    });
});


storeRoutes.put('', [verificaToken],  (req: any, res: Response )  => {

    const store = {
        id:                 req.body._id,
        nombre:             req.body.nombre,
        direccion:          req.body.direccion,
        codigoPostal:       req.body.codigoPostal,
        localidad:          req.body.localidad,
        provincia:          req.body.provincia,
        servicios:          req.body.servicios,
        dias:               req.body.dias,
        esDeCorrido:        req.body.esDeCorrido,
        horarioDesde:       req.body.horarioDesde,
        horarioHasta:       req.body.horarioHasta,
        horarioTardeDesde:  req.body.horarioTardeDesde,
        horarioTardeHasta:  req.body.horarioTardeHasta,
        es24hs:             req.body.es24hs,
        descripcion:        req.body.descripcion,
        promocion:          req.body.promocion,
        telefono :          req.body.telefono,
        userId :            req.body.userId
    }

    Store.findByIdAndUpdate( store.id, store, { new: true }, (err, storeDB) => {

        if ( !storeDB ) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No existe  un store con ese ID'
            });
        }
        res.json({
            ok: true,
            data: storeDB,
            message:"Store actualizada."
        });
    });
});

storeRoutes.get('/findByUserId', [ verificaToken ], ( req: any, res: Response ) => {
    Store.find({userId:req.query.userId}, ( err: any, storeDB: any[]) => {
        if ( err ) {
            res.status(500);
            throw err;
        } else if(!storeDB || storeDB.length == 0){
            return res.status(404).json({
                ok: false,
                mensaje: 'No existe un store con ese userId'
            });
        }else {
            res.json({
                ok: true,
                data: storeDB[0]
            });
        }
    })
});

storeRoutes.get('/findById', [ verificaToken ], ( req: any, res: Response ) => {

    Store.find({_id:req.query.id}, ( err: any, storeDB: any ) => {
        if ( err ) {
            res.status(500);
            throw err;
        } else if(!storeDB || !storeDB[0].userId){
            return res.status(404).json({
                ok: false,
                mensaje: 'No existe un store con ese ID'
            });
        }else {
            res.json({
                ok: true,
                data: storeDB[0]
            });
        }
    })
});

storeRoutes.get('/find', [ verificaToken ], ( req: any, res: Response ) => {

    const nombre = req.query.nombre;
    const localidad = req.query.localidad;
    const codigoPostal = req.query.codigoPostal;
    const servicio = req.query.servicio;

    var query : any = {};


    if(nombre && nombre !== "" ) {
        query["nombre"] =  { $regex: '.*' + nombre + '.*' } ;
    }
    if(localidad && localidad !== "" ) {
        query["localidad"] =  { $regex: '.*' + localidad + '.*' } ;
    }
    if(codigoPostal && codigoPostal !== "" ) {
        query["codigoPostal"] = codigoPostal;
    }
    query["servicios"] = servicio;
    Store.find(query, ( err: any, storeDB: any ) => {
        if ( err ) {
            res.status(500);
            throw err;
        } else if(!storeDB || !storeDB[0].userId){
            return res.status(404).json({
                ok: false,
                mensaje: 'No existe un store con esos parametros de busqueda'
            });
        }else {
            res.json({
                ok: true,
                data: storeDB
            });
        }
    })
});


export default storeRoutes;