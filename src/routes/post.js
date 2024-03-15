//Import the Express
const express = require('express');
const router = express.Router();
const {
    createPost,
    getAllPosts,
    getPost,
    updatePost,
    deletePost
} = require('../controllers/post');

//Post, Patch and delete need authentication. Not all of the clients cand create, update, delete all of the posts. That´s why we add the middleware.
const { authMiddleware } = require("../middleware/authMiddleware");


//Create Routers
router.post('/', authMiddleware, createPost); //it has to go through the middleware first for authentication).
router.get('/', getAllPosts);
router.get('/:id', getPost);
router.patch('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost); //We´ll pass the controller in the second argument.




module.exports = router;