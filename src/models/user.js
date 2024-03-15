const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({ //This will be an object. This is going to be the blueprint of the schema
    username: { type: String, required: true, unique: true }, //The username is a string, required and unique
    password: { type: String, required: true }
});
//Once we have the blueprint Schema..., we have to create the model and export it, not the schema

const User = mongoose.model("Course-User", userSchema); //We use the course-user model (name of the model) 
//this will be the collection name in the database on the atlas

//We export the model that we created with the user:

module.exports = User;