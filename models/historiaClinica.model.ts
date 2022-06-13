import { Schema, model, Document } from 'mongoose';

const historiaClinicaSchema = new Schema({

    nombre: {
        type: String,
        required: [ true, 'El nombre es necesario' ]
    }
});

interface IHistoriaClinica extends Document {
    numeroHistoriaClinica: number;
    descripcion: string;
    comentarios: string;//500
    tipos: []; //vacuna, antiparasitario, enfermedad/antecente
    archivos: [];
    fecha: string;//fecha de creacion;
    petId: string;
}

//POST 
//DELETE
//FIND ORDER BY DECHA DESCENDENTE

export const HistoriaClinica = model<IHistoriaClinica>('HistoriaClinica', historiaClinicaSchema);