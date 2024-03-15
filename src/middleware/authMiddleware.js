const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => { //after this middleware, it´s going to proceed to the next one.
    const token = req.header("Authorization");
    //We want to check if there is a token or not.

    if (!token) return res.status(403).json({error: "Access Denied"}); //403: the client doesn´t have permission

        try {
            const decoded = jwt.verify( //We are going to verify the token that we received
                token.substring(7), //the 7 is removing the first prefix in the token that comes in. When receiving a token, it has a bearer, so we need to remove it.
                process.env.JWT_SECRET
            );
            req.user = { userID: decoded.id }

            next();
        } catch (error) {
            res.status(403).json ({ error: "Access Denied" });          
        }
}

//export

module.exports = {
    authMiddleware
};