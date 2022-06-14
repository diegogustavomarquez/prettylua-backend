
import { Schema, model, Document } from 'mongoose';

const storeSchema = new Schema({

    nombre: {
        type: String,
        required: [ true, 'El nombre es necesario' ]
    },
    direccion: {
        type: String,
        required: [ true, 'El direccion es necesario' ]
    },
    codigoPostal: {
        type: String,
        required: [ true, 'El codigoPostal es necesario' ]
    },
    localidad: {
        type: String,
        required: [ true, 'El localidad es necesario' ]
    },
    provincia: {
        type: String,
        required: [ true, 'La provincia es necesario' ]
    },
    servicios: {
        type: Array,
        required: [ true, 'El servicios es necesario' ]
    },
    dias: {
        type: Array,
        required: [ true, 'La dias es necesaria' ]
    },
    esDeCorrido: {
        type: Boolean,
        required: [ true, 'La esDeCorrido es necesaria' ]
    },
    horarioDesde: {
        type: String,
        required: [ true, 'El horarioDesde es necesario' ]
    },
    horarioHasta: {
        type: String,
        required: [ true, 'El horarioHasta es necesario' ]
    },
    es24hs: {
        type: Boolean,
        required: [ true, 'El es24hs es necesario' ]
    },
    descripcion: {
        type: String,
        required: [ true, 'El descripcion necesario' ]
    },
    telefono: {
        type: String,
        required: [ true, 'El telefono necesario' ]
    },
    promocion: {
        type: String,
        required: [ true, 'La promocion  es necesario' ]
    },
    userId: {
        type: String,
        unique: true,
        required: [ true, 'El usuario es necesario' ]
    }
});

interface IStore extends Document {
    nombre: string;
    direccion: string;
    codigoPostal: string;
    localidad: string;
    provincia: string;
    servicios: [];
    dias: [];
    esDeCorrido: Boolean;
    horarioDesde: string;
    horarioHasta: string;
    horarioTardeDesde: string;
    horarioTardeHasta: string;
    es24hs: Boolean;
    descripcion: String;
    promocion: String;
    telefono : number;
    userId : String;
}

export const Store = model<IStore>('Store', storeSchema);