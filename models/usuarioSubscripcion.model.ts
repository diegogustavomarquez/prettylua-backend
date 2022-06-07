
import { Schema, model, Document } from 'mongoose';

const usuarioSubscripcionSchema = new Schema({

    nombre: {
        type: String,
        required: [ true, 'El nombre es necesario' ]
    },
    userId: {
        type: String,
        unique: true,
        required: [ true, 'El usuario es necesario' ]
    }
});

interface IUsuarioSubscripcion extends Document {
    nombre: string;
    userId : String;
}

export const UsuarioSubscripcion = model<IUsuarioSubscripcion>('UsuarioSubscripcion', usuarioSubscripcionSchema);