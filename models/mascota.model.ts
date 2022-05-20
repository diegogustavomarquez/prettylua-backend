import { Schema, model, Document } from 'mongoose';


const mascotaSchema = new Schema({

    nombre: {
        type: String,
        required: [ true, 'El nombre es necesario' ]
    },
    raza: [{
        type: String,
        required: [ true, 'La raza es necesaria' ]
    }],
    sexo: {
        type: String,
    },      
    anio: {
        type: Number,
   },
   mes: {
    type: Number,
   },
    castrado: {
        type: String,
       
    },
    Veterinario: {
        type: String,
       
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
    sexo : string;
    raza : string;
    anio: Number;
    mes : Number;
    foto: string[];
    estado: String;
    codigo : String;

  
}

export const Mascota = model<IMascota>('Mascota', mascotaSchema);