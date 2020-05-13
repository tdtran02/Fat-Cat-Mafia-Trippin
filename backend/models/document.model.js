const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const documentSchema = new Schema(
    {
        description: { type: String },
        fileLink: { type: String },
        s3_key: { type: String }
    }
   
);


const Document = mongoose.model("Document", documentSchema);

module.exports = Document;