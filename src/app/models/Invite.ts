import { Schema, Document, model } from 'mongoose';

interface IInvite extends Document {
    to: string;
    from: string;
    createdAt: Date;
    updatedAt: Date;
}
const InviteSchema = new Schema({
    to: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default model<IInvite>('Invite', InviteSchema);
