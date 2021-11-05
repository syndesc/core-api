import { Schema, Document, model } from 'mongoose';

interface IComment {
    userId: string;
    name: string;
    content: string;
    sendAt: Date;
}
interface IPost extends Document {
    userId: string;
    caption: string;
    files: string[];
    likes: string[];
    deslikes: string[];
    comments: IComment[];
    createdAt: Date;
    updatedAt: Date;
}
const PostSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    files: {
        type: Array,
        default: []
    },
    likes: {
        type: Array,
        default: []
    },
    deslikes: {
        type: Array,
        default: []
    },
    comments: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
});

export default model<IPost>('Post', PostSchema);
