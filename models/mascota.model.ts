import { Schema, model, Document } from 'mongoose';


const petSchema = new Schema({

    name: {
        type: String,
        required: [ true, 'El nombre es necesario' ]
    },
    breed: {//raza
        type: String,
        required: [ true, 'La raza es necesaria' ]
    },
    kind: {//tipo de animal
        type: String,
        required: [ true, 'Debe especificar el tipo de mascota' ]
    },
    color: {
        type: String,
        required: [ true, 'Debe especificar el color de la mascota' ]
    },
    gender: {//genero
        type: String,
    },      
    year: {
        type: Number,
    },
    mes: {
        type: Number,
    },
    castrated: {
        type: Boolean,

    },
    vets: [{
        type: String,
       
    }],
    pics: [{
        type: String,
     
    }],
    isAlive: {//si vive
       type: Boolean,
       required: [ true, 'Debe especificar si vive' ]
    },
    status: {//si fue dado de baja
       type: Boolean

    },
    userId: {
        type: String,
       // ref: 'Usuario',
        required: [ true, 'Debe de existir una referencia a un usuario' ]
    }
  
});

interface IPet extends Document {
    name: string;
    gender : string;
    breed : string;
    kind : string;
    color : string;
    year: Number;
    month : Number;
    pics: string[];
    vets: string[];
    isAlive: Boolean;
    castrated: Boolean;
    status: Boolean;
    userId : String;

}

export const Pet = model<IPet>('Pet', petSchema);