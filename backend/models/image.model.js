const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
    Image Schema for storing images in 
    mongodb database
*/

var imageSchema = new Schema({
    owner_id: String,
    imageCate: String,
    imageName: {
        type: String,
        default: "none",
        required: true
    },
    imageData:{
        type: String,
        required: true
    }
});

const image = mongoose.model("image", imageSchema);

module.exports = image;