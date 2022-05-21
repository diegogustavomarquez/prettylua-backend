import { Response, Request, NextFunction } from 'express';
import Token from '../classes/token';
import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';

export const verificaToken = ( req: any, res: Response, next: NextFunction  ) => {

    const userToken = req.get('x-token') || '';

    Token.comprobarToken( userToken )
        .then(  (decoded: any) => {
            console.log('Decoded', decoded );
            req.usuario = decoded.usuario;
            next();
        })
        .catch( err => {
            res.status(StatusCodes.UNAUTHORIZED);
            res.json({
                ok: false,
                mensaje: 'Token no es correcto',
//                 userToken: req.usuario
            });
        });

}


