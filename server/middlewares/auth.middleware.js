const jwt = require('jsonwebtoken')
const User = require("../models/User");

const secret = "UH@3vs,MEd,3lqLDQkb')[}J";

const authMiddleWare = async (req, res, next) => {

    const token = req.headers.token;

    if(!token){
        return res.status(401).json({error: "Access error"});
    } 
    try {
        const tokenPayload = jwt.verify(token, secret);

        const userLoggedIn = await User.findById(tokenPayload.id);

        if(!userLoggedIn){
            return res.status(401).json({error: "Invalid Credentials!"});
        }
        
        req.userLoggedIn = userLoggedIn;
        next();
    } 
    catch(e) {
        console.log(e);
        return res.status(401).json({error: "Access error!"});
    }
}

module.exports = authMiddleWare;