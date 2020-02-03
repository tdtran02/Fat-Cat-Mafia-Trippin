const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creating Schema and Model for user
const userSchema = new Schema({
    first_name: String,
    last_name: String,
    user_id: String,
    email: String,
    password: String
});

const UserChar = mongoose.model('userchar', userSchema);

module.exports = UserChar;

var user = new UserChar({})
