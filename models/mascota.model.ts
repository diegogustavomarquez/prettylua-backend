import { Schema, model, Document } from 'mongoose';


const mascotaSchema = new Schema({

    nombre: {
        type: String,
        required: [ true, 'El nombre es necesario' ]
    },
    especie: {
        type: String,
        required: [ true, 'La especie es necesario' ]
    },
    raza: {
        type: String,
        required: [ true, 'La raza es necesario' ]
    },
   
    fechaNacimiento: {
        type: Date,
       
        required: [ true, 'La fecha de nacimiento es necesario' ]
    },
    foto: [{
        type: String,
     
    }],
    estado: {
        type: String,
       
    },

    codigo: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [ true, 'Debe de existir una referencia a un usuario' ]
    }
  
  
});



interface IMascota extends Document {
    nombre: string;
    especie : string;
    raza : string;
    fechaNacimiento: Date;
    foto: string[];
    estado: String;
    codigo : String;

  
}

export const Mascota = model<IMascota>('Mascota', mascotaSchema);