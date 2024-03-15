const User = require("../models/user"); //we call/require  the model
const bcrypt = require ("bcrypt"); //we require bcrypt. Bcrypt is designed to  be slow
const jwt = require ("jsonwebtoken"); //we require jwt

//Registration/Sign UP the user
const signupUser = async (req, res) => {
    const { username, password } = req.body //we extract the username and the password

    try { //try: first we have to check if the username already exists or not
        const exists = await User.findOne ({username}); // It´s goint to go through the database to double check any repeated user
        if (exists) { //if exists:
            return res.status(400).json ({ error: "Username already in use." })//it will give a response with an error 400.
        } //if there´s no any existing name, we can status by hashing the password:
        //We will create bcrypt for hashing the password

        const hashedPassword = await bcrypt.hash(password, 10); //What we will hash and how many times it will hash it. The more times, the slower but safer
        //
        const newUser = await User.create ({ // we will add the values that we want to create
            username,
            password: hashedPassword //We won´t change the username but we will change the password to the hashed password.
        });
        
        res.status(201).json({ newUser }); //We will create the new user.

    } catch (error) {
        res.status(400).json ({ error: error.message }); //error is an object so that´s why we extract the message from it.
    }

};

//-----------------------

//To login the user
const loginUser = async (req, res) => { //we will send a request with the user and the password
    const { username, password } = req.body; //We´re getting the user by splitting into username and password from the body. That's why we use POST in the API and not GET. 
    //With GET, we can call body and split it; However, with POST we can.
    //We have to check if the user exists or not (opposite that before). If the user doesn´t exist, we will throw an error 404:
    //GET = we're just reading......... POST = we're writing
    try {
        const exists = await User.findOne ({ username });
        if (!exists) {
            return res.status(404).json({ error: "Username not found." });
        } //if user exists, then we proceed:
        
        const isPasswordMatched = await bcrypt.compare(password, exists.password);
        //this should be a boolean. We will use a method from bcrypt and we will compare the passwords.
        //It´s going to compare the password that the user entered, and the existing password
        
        if (!isPasswordMatched) { //if password doesn´t match:
            return res.status(400).json({ error: "Incorrect password." });
        }
        //we will create a token by taking jwt 
        const token = jwt.sign({ userId: exists._id}, process.env.JWT_SECRET); //The first argument is an object; the next is a secret signature (jwt secret token).
        //The problem if we push BFS01$_ into Github is not secure anymore. We have to create it in .env and exchange it by process.env.JWT_SECRET

        res.status(200).json ({ username, token }); //we will show the username and the token that we created.

    } catch (error) {
        res.status(400).json ({ error: error.message });
    }
}

//Export the controllers:

module.exports = {
    signupUser,
    loginUser
}