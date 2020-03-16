const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    owner_id: String,
    first_name: String,
    last_name: String,
    user_pic: String,
    trip_id: String,
    text: String,
    date: Date,
    commentsOnThisPost: [{
        owner_id: String,
        first_name: String,
        last_name: String,
        text: String,
        date: Date
    }]
})

const Comment = mongoose.model("comment", commentSchema);
module.exports = Comment;