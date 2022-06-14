import { Schema, model, Document } from 'mongoose';

const historiaClinicaSchema = new Schema({

    codigo: {
        type: String
    },
    petId: {
        type: String
    },
    tipos: [{
        type: String
    }],
    descripcion: {
        type: String
    },
    adjuntos: [{
        type: String
    }],
    comentarios: {
        type: String
    },
    fecha: {
        type: Date
    }
});

interface IHistoriaClinica extends Document {
    codigo: string; // lo agrega el backend
    petId: string; //es obligatorio
    tipos: []; //vacuna, antiparasitario, enfermedad, control, estudios medicos, es obligatorio al menos uno
    descripcion: string; //es obligatorio

    adjuntos: [];
    comentarios: string;//500
    fecha: Date;//fecha de creacion; // lo agrega el backend
    fechaLong: number;
}

//POST 
//DELETE
//FIND ORDER BY DECHA DESCENDENTE

export const HistoriaClinica = model<IHistoriaClinica>('HistoriaClinica', historiaClinicaSchema);