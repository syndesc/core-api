import { Schema, Document, model } from 'mongoose';

interface IUser extends Document {
    firstName: string;
    lastName: string;
    username: string;
    tag: string;
    email: string;
    senha: string;
    friends: string[];
    blocklist: string[];
    communities: string[];
    confirmed: boolean;
    verified: boolean;
    profile: string;
    createdAt: Date;
    updatedAt: Date;
}
const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    senha: {
        type: String,
        required: true
    },
    friends: {
        type: Array,
        default: []
    },
    blocklist: {
        type: Array,
        default: []
    },
    communities: {
        type: Array,
        default: []
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    verified: {
        type: Boolean,
        default: false
    },
    profile: {
        type: String,
        default: '/default.png'
    }
}, {
    timestamps: true
});

export default model<IUser>('User', UserSchema);
