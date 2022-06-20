
import { Schema, model, Document } from 'mongoose';

const subscriptionSchema = new Schema({

    endpoint: {
        type: String,
        required: [ true, 'El endpoint es necesario' ]
    },
    p256dh: {
        type: String,
        required: [ true, 'El p256dh es necesario' ]
    },
    auth: {
        type: String,
        required: [ true, 'El auth es necesario' ]
    },
    userId: {
        type: String,
        unique: true,
        required: [ true, 'El userId es necesario' ]
    }
});

interface ISubscription extends Document {
    endpoint: string;
    p256dh: string;
    auth: string;
    userId : string;
}

export const Subscription = model<ISubscription>('Subscription', subscriptionSchema);