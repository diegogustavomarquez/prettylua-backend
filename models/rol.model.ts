
import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

const rolSchema = new Schema({
    nombre: {
        type: String,
        required: [ true, 'El nombre es necesario' ]
    },
    perfil: {
        type: String,
        required: [ true, 'El perfil es necesario' ]
    }
});

interface IRol extends Document {
    nombre: string;
    perfil : string;

}

export const Rol = model<IRol>('Rol', rolSchema);