
import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

const profileSchema = new Schema({

    nombre: {
        type: String,
        required: [ true, 'El nombre es necesario' ]
    },
    roles: [{
        type: String,
        required: [ true, 'Debe selecionar un rol' ]
    }]

});

interface IProfile extends Document {
    nombre: string;
    descripcion :string;
    roles : string[];
}

export const Profile = model<IProfile>('Profile', profileSchema);