import mongoose, { Schema } from "mongoose";

const contentScema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true
    },
    imgTitle: {
        type: String,
    },
    imgThumb: {
        type: String,
    },
    imgVertical: {
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