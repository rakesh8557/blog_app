const { Schema, default: mongoose } = require("mongoose");

const commentSchema = new Schema({
    content : {
        type : String,
        required : true
    },
    createdBy : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    blogId : {
        type : Schema.Types.ObjectId,
        ref : 'blog'
    }
}, {timestamps:true});

module.exports = mongoose.model("comment", commentSchema);