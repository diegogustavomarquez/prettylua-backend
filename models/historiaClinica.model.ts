import { Schema, model, Document } from 'mongoose';

const historiaClinicaSchema = new Schema({

    nombre: {
        type: String,
        required: [ true, 'El nombre es necesario' ]
    }
});

interface IHistoriaClinica extends Document {
    numeroHistoriaClinica: number; // lo agrega el backend
    petId: string; //es obligatorio
    tipos: []; //vacuna, antiparasitario, enfermedad, control, estudios medicos, es obligatorio al menos uno
    descripcion: string; //es obligatorio

    archivos: [];
    comentarios: string;//500
    fecha: string;//fecha de creacion; // lo agrega el backend
}

//POST 
//DELETE
//FIND ORDER BY DECHA DESCENDENTE

export const HistoriaClinica = model<IHistoriaClinica>('HistoriaClinica', historiaClinicaSchema);