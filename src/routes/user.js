const express = require("express"); //we require the router
const router = express.Router(); 

//We have to decomposs it:
const { signupUser, loginUser } = require("../controllers/user"); //it´s coming from controllers/user

router.post("/signup", signupUser); //for signing up, we use the POST (We create a new user)
router.post("/login", loginUser); //POST = we use the body as well. / --> we use that when it´s in the URL

//

module.exports = router;

