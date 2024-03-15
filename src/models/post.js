//post.js

//Import Mongoose
const mongoose = require("mongoose");

//Create a schema model (JSON format --> data structured)
const postSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    description: {type: String, required: true},
    likes: {type: Number, required:true},
    comments: [{body: String}],
});

const post = mongoose.model("Post", postSchema);

//Export the Post Model
module.exports = post;