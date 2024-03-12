import mongoose, { Schema } from "mongoose";

const featuredContentsScema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isSeries: {
        type: Boolean,
    },
    contentList: [{
        type: Schema.Types.ObjectId,
        ref: "Content"
    }]
}, { timestamps: true, versionKey: false });

const FeaturedContents = mongoose.model('FeaturedContents', featuredContentsScema);

export default FeaturedContents;