
import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { Profile } from './profile.model';

const usuarioSchema = new Schema({

    nombre: {
        type: String,
        required: [ true, 'El nombre es necesario' ]
    },
    apellido: {
        type: String,
        required: [ true, 'El Apellido es necesario' ]
    },
    telefono: {
        type: Number,
        required: [ true, 'El telefono es necesario' ]
    },
    avatar: {
        type: String,
        default: 'av-1.png'
    },
    email: {
        type: String,
        unique: true,
        required: [ true, 'El correo es necesario' ]
    },
    password: {
        type: String
    },
    perfil: {
       type: String,
//        ref: 'profile',
       required: [ true, 'Debe de existir una referencia a un perfil' ]
    }
});

usuarioSchema.method('compararPassword', function( password: string = ''): boolean {

    if (  bcrypt.compareSync( password, this.password ) ) {
        return true;
    } else {
        return false;
    }

});

interface IUsuario extends Document {
    nombre: string;
    apellido :string;
    telefono : number;
    email : string;
    password: string;
    avatar: string;
    perfil : string;

    compararPassword(password: string): boolean;
}

export const Usuario = model<IUsuario>('Usuario', usuarioSchema);