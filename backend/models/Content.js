import mongoose, { Schema } from "mongoose";

const contentScema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    imageTitle: {
        type: String,
    },
    imageThumb: {
        type: String,
    },
    imageVertical: {
        type: String,
    },
    trailer: {
        type: String,
    },
    movie: {
        type: String,
    },
    duration: {
        type: String,
    },
    year: {
        type: String,
    },
    limit: {
        type: String,
    },
    genre: {
        type: String, // TODO: maybe enum
    },
    isSeries: {
        type: Boolean,
    },
}, 
{timestamps: true});// מוסיף תאריכים מתי היוזר נוצר במונגו

const Content = mongoose.model('Content', contentScema);

export default Content;