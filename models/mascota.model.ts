import { Schema, model, Document } from 'mongoose';


const petSchema = new Schema({

    name: {
        type: String
    },
    breed: {//raza
        type: String
    },
    code: {
        type: String
    },
    kind: {//tipo de animal
        type: String
    },
    gender: {//genero
        type: String,
    },      
    dateOfBirth: {
        type: String
    },
    dateOfBirthDetail: {
        type: String
    },
    notes: {
        type: String
    },
    vets: [{
        type: String
    }],
    pics: [{
        type: String
    }],
    status: {//si fue dado de baja
       type: String
    },
    userId: {
        type: String
    }
});

interface IPet extends Document {
    name: string;
    gender : string;
    code : string;
    breed : string;
    kind : string;
    dateOfBirth: string;
    dateOfBirthDetail : Number;
    notes: String;
    pics: string[];
    vets: string[];
    status: Boolean;
    userId : String;

}

export const Pet = model<IPet>('Pet', petSchema);