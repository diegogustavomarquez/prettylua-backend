import { Router, Request, Response } from 'express';
import { Pet } from '../models/mascota.model';
import { Usuario } from '../models/usuario.model';
import bcrypt from 'bcrypt';
import Token from '../classes/token';
import { verificaToken } from '../middlewares/autenticacion';
import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';
const petRoutes = Router();

/**
* Create pet
**/
petRoutes.post('/createPet', verificaToken,( req: Request, res: Response ) => {

    const pet = {
        name     : req.body.name,
        gender   : req.body.gender,
        breed    : req.body.breed,
        kind     : req.body.kind,
        color    : req.body.color,
        year     : req.body.year,
        month    : req.body.mes,
        pics     : req.body.pics,
        vets     : req.body.vets,
        isAlive  : req.body.isAlive,
        userId   : req.body.userId,
        status   : req.body.status,
     castrated   : req.body.castrated
    };

    const user =  req.body.userId;
    Usuario.find(( err: any, userDB: any ) => {
      if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                message: 'No existe un usuario con ese ID'
            });
        }
        const tokenUser = Token.getJwtToken({
            _id: userDB._id,
            nombre   : userDB.nombre,
            apellido : userDB.apellido,
            password : userDB.password,
            email    : userDB.email,
            telefono : userDB.telefono,
            avatar   : userDB.avatar,
            perfil   : userDB.perfil
        });
    Pet.create( pet ).then( petDB => {
          const pet = {
            _id             : petDB._id,
            name            : petDB.name,
            gender          : petDB.gender,
            kind            : petDB.kind,
            breed           : petDB.breed,
            color           : petDB.color,
            year            : petDB.year,
            month           : petDB.month,
            pics            : petDB.pics,
            vets            : petDB.vets,
            isAlive         : petDB.isAlive,
            castrated       : petDB.castrated,
            status          : petDB.status,
            userId          : petDB.userId
          }
        res.status(201).json({
            ok: true,
            message: "se ha creado la mascota ",
            token: tokenUser,
            petResult: pet
        });
    }).catch( err => {
        res.status(500).json({
            ok: false,
            err
        });
    });

    })

});

/**
* Update pet by its id
* @param id
*
**/
petRoutes.put('/updatePet', verificaToken, (req: any, res: Response ) => {

    const pet = {
        id       : req.body.id,
        name     : req.body.name,
        gender   : req.body.gender,
        breed    : req.body.breed,
        kind     : req.body.kind,
        color    : req.body.color,
        year     : req.body.year,
        month    : req.body.month,
        pics     : req.body.pics,
        vets     : req.body.vets,
        isAlive  : req.body.isAlive,
        status   : req.body.status,
        userId   : req.body.userId,
     castrated   : req.body.castrated
    };

    Pet.findByIdAndUpdate( pet.id, pet, { new: true }, (err, petDB) => {

        if ( !petDB ) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No existe la mascota con ese ID'
            });
        }

        const petResult = {
            _id             : petDB._id,
            name            : petDB.name,
            gender          : petDB.gender,
            kind            : petDB.kind,
            breed           : petDB.breed,
            color           : petDB.color,
            year            : petDB.year,
            month           : petDB.month,
            pics            : petDB.pics,
            vets            : petDB.vets,
            isAlive         : petDB.isAlive,
            castrated       : petDB.castrated,
            status          : petDB.status,
            userId          : petDB.userId
        
        }
        res.json({
            ok: true,
            data: petResult,
            message:"Mascota actualizada."
        });
    });

});


/**
* Search pet by its id
* @param petId
**/
petRoutes.get('/byId', [ verificaToken ], ( req: any, res: Response ) => {
    const idParam = req.query.petId;

    Pet.findById( {_id: idParam}, ( err: any, petDB: any) => {

        const pet = {
            _id             : petDB._id,
            name            : petDB.name,
            gender          : petDB.gender,
            kind            : petDB.kind,
            breed           : petDB.breed,
            color           : petDB.color,
            year            : petDB.year,
            month           : petDB.month,
            pics            : petDB.pics,
            vets            : petDB.vets,
            isAlive         : petDB.isAlive,
            castrated       : petDB.castrated,
            status          : petDB.status,
            userId          : petDB.userId

        }

        if ( !petDB ) {
            return res.status(404).json({
                ok: false,
                message: 'No existe la mascota para el id'
            });
        }
        res.json({
            ok: true,
            data : petDB
        });
    });

});

/**
* Gets the list of pets by user id
* @param userId
**/
petRoutes.get('/byUserId', [ verificaToken ], ( req: any, res: Response ) => {
    const userIdParam = req.query.userId;

    Pet.find( {userId: userIdParam}, ( err: any, petDB: any) => {

        const pet = {
            _id             : petDB._id,
            name            : petDB.name,
            gender          : petDB.gender,
            kind            : petDB.kind,
            breed           : petDB.breed,
            color           : petDB.color,
            year            : petDB.year,
            month           : petDB.month,
            pics            : petDB.pics,
            vets            : petDB.vets,
            isAlive         : petDB.isAlive,
            castrated       : petDB.castrated,
            status          : petDB.status,
            userId          : petDB.userId

        }

        if ( !petDB || !petDB._id) {
            return res.status(404).json({
                ok: false,
                message: 'No existe la mascota para el usuario'
            });
        }
        res.json({
            ok: true,
            data : petDB
        });
    });

});

export default petRoutes;