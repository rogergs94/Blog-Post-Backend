//Import Post Schema
const Post = require("../models/post"); 

//Controller: Creating a Create Post Controller (C of CRUD)
const createPost = async(req, res) => {
    //Destructuring the body of req
    const { title, author, description, likes, comments } = req.body;

    try {
        const post = await Post.create({
            title,
            author,
            description,
            likes,
            comments,
        });
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};


//Controller: Get all the post / R (read) of CRUD.
//We are goint to read out Database on MongoDB. We´ll creat a variable with an async function

const getAllPosts = async(req, res) => {
    try {
        const posts = await Post.find(); //We want to get the result before we move on. If we have any error it will move to the error (catch)
        res.status(200).json({ //we convert it in a JSON format
            count: posts.length, 
            posts,
        }) //After this, we will catch an error
    } catch (error) { //We´ll catch an error in our process
        res.status(400).json({error: error.message});
    }
};

//Controller: Get a single post

const getPost = async (req, res) => {
    const {id} = req.params;
    try{
        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ error: "No post found." }) //Si no se cumple esta condición, saltaremos a la siguiente linea.
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

//Controller: Update a post / U of CRUD
const updatePost = async(req, res) => {
    const {id} = req.params;
    try{
        const post = await Post.findByIdAndUpdate(
            {_id: id},
            { ...req.body },
            { new: true, runValidators: true}
        );
            if (!post) {
                return res.status(404).json({
                    error: "No matching post found!"
                });
            };
            res.status(200).json({
                message: "The post has been succesfully updated.",
                post
            });
    } catch (error) {
        res.status(400).json({error: error.message});     
    }
}

//Controller: Delete a single post / D of CRUD
const deletePost = async(req, res) => {
    const{id} = req.params;
    try {
        const post = await Post.findByIdAndDelete({_id: id});
        if (!post) { //Si no hay ningun post hará lo siguiente:
            return res.status(404).json ({ //404 argument
                error: "No matching post found!"
            });
        } 
        res.status(200).json ({ //200: the request is succesful
            message: "The post has been succesfully deleted!"
        });
    } catch (error) { //Si en const post = await Post.... hay algún error, lanzaremos un error 400
        res.status(400).json({ error: error.message });
    }
}




//Export 
module.exports = { //We will export multiple items
    createPost,
    getAllPosts,
    getPost,
    updatePost,
    deletePost
}; 