import { Schema, model, Document } from 'mongoose';


const kindSchema = new Schema({
    description: {
        type: String
    }
});

interface IKind extends Document {
    description : string;
}

export const Kind = model<IKind>('Kind', kindSchema);