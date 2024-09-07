const { Schema, default: mongoose } = require("mongoose");

const blogSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    body : {
        type : String,
        required : true
    },
    coverImage : {
        type: String
    },
    createdBy : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }
}, {timestamps : true});

module.exports = mongoose.model("blogs", blogSchema);