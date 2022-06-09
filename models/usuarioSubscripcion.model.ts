
import { Schema, model, Document } from 'mongoose';

const usuarioSubscripcionSchema = new Schema({

    nombre: {
        type: String,
        required: [ true, 'El nombre es necesario' ]
    },
    cuitcuil: {
        type: String,
        required: [ true, 'El cuit/cuil es necesario' ]
    },
    fechaInicio: {
        type: String,
        required: [ true, 'El fecha inicio es necesario' ]
    },
    responsable: {
        type: String,
        required: [ true, 'El Responsable es necesario' ]
    },
    direccionFisica: {
        type: String,
        required: [ true, 'La direccion fisica es necesario' ]
    },
    titularTarjeta: {
        type: String,
        required: [ true, 'El Titular es necesario' ]
    },
    prefijo: {
        type: String,
        required: [ true, 'La tarjeta es necesaria es necesaria' ]
    },
    subfijo: {
        type: String,
        required: [ true, 'La tarjeta es necesaria es necesaria' ]
    },
    caducidad: {
        type: String,
        required: [ true, 'El caducidad es necesario' ]
    },
    cvc: {
        type: String,
        required: [ true, 'El cvc es necesario' ]
    },
    userId: {
        type: String,
        unique: true,
        required: [ true, 'El usuario es necesario' ]
    }
});

interface IUsuarioSubscripcion extends Document {
    nombre: string;
    cuitcuil: string;
    fechaInicio: string;
    responsable: string;
    direccionFisica: string;
    titularTarjeta: string;
    prefijo: string;
    subfijo: string;
    caducidad: String;
    cvc: string;
    userId : String;
}

export const UsuarioSubscripcion = model<IUsuarioSubscripcion>('UsuarioSubscripcion', usuarioSubscripcionSchema);