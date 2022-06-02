import { Router, Request, Response } from 'express';
import { Pet } from '../models/mascota.model';
import { Kind } from '../models/kind.model';
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
            id               : req.body._id,
            name              : req.body.name,
            gender            : req.body.gender,
            kind              : req.body.kind,
            breed             : req.body.breed,
            dateOfBirth       : req.body.dateOfBirth,
            dateOfBirthDetail : req.body.dateOfBirthDetail,
            pics              : req.body.pics,
            vets              : req.body.vets,
            notes             : req.body.notes,
            userId            : req.body.userId
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
            _id               : petDB._id,
            name              : petDB.name,
            gender            : petDB.gender,
            kind              : petDB.kind,
            breed             : petDB.breed,
            dateOfBirth       : petDB.dateOfBirth,
            dateOfBirthDetail : petDB.dateOfBirthDetail,
            pics              : petDB.pics,
            vets              : petDB.vets,
            notes             : petDB.notes,
            userId            : petDB.userId
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
            id               : req.body._id,
            name              : req.body.name,
            gender            : req.body.gender,
            kind              : req.body.kind,
            breed             : req.body.breed,
            dateOfBirth       : req.body.dateOfBirth,
            dateOfBirthDetail : req.body.dateOfBirthDetail,
            pics              : req.body.pics,
            vets              : req.body.vets,
            notes             : req.body.notes,
            userId            : req.body.userId
    };

    Pet.findByIdAndUpdate( pet.id, pet, { new: true }, (err, petDB) => {

        if ( !petDB ) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No existe la mascota con ese ID'
            });
        }

        const petResult = {
            _id               : petDB._id,
            name              : petDB.name,
            gender            : petDB.gender,
            kind              : petDB.kind,
            breed             : petDB.breed,
            dateOfBirth       : petDB.dateOfBirth,
            dateOfBirthDetail : petDB.dateOfBirthDetail,
            pics              : petDB.pics,
            vets              : petDB.vets,
            notes             : petDB.notes,
            userId            : petDB.userId
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
            _id               : petDB._id,
            name              : petDB.name,
            gender            : petDB.gender,
            kind              : petDB.kind,
            breed             : petDB.breed,
            dateOfBirth       : petDB.dateOfBirth,
            dateOfBirthDetail : petDB.dateOfBirthDetail,
            pics              : petDB.pics,
            vets              : petDB.vets,
            notes             : petDB.notes,
            userId            : petDB.userId
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
            _id               : petDB._id,
            name              : petDB.name,
            gender            : petDB.gender,
            kind              : petDB.kind,
            breed             : petDB.breed,
            dateOfBirth       : petDB.dateOfBirth,
            dateOfBirthDetail : petDB.dateOfBirthDetail,
            pics              : petDB.pics,
            vets              : petDB.vets,
            notes             : petDB.notes,
            userId            : petDB.userId
        }

        if ( !petDB) {
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


/**
* Gets kind of pets list
**/
petRoutes.get('/kindOf', [ verificaToken ], ( req: any, res: Response ) => {

    Kind.find( ( err: any, kindDB: any) => {

        if ( !kindDB) {
            return res.status(404).json({
                ok: false,
                message: 'No existen tipos de mascotas'
            });
        }
        res.json({
            ok: true,
            data : kindDB
        });
    });

});

/**
* Delete pets
**/
petRoutes.delete('/delete', [ verificaToken ], ( req: any, res: Response ) => {
    const idParam = req.query.petId;
    Pet.findByIdAndDelete({_id: idParam}, ( err: any, petDB: any) => {

        if ( !petDB) {
            return res.status(404).json({
                ok: false,
                message: 'No existen macota con ese id:'+idParam
            });
        }
        res.json({
            ok: true,
            message : "Mascota eliminada"
        });
    });

});
export default petRoutes;