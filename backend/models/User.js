import mongoose, { Schema } from "mongoose";

const userScema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
    },
    contentList: [{ type: Schema.Types.ObjectId, ref: 'Content' }]
}, 
{timestamps: true, versionKey: false});// מוסיף תאריכים מתי היוזר נוצר במונגו

const User = mongoose.model('User', userScema);

export default User;