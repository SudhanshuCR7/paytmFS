const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("./config");

const authMiddleware = async (req,res,next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer"))
    {   
        return res.status(403).json({
            msg: "auth header invalid"
        })
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if(decoded.userId){
            req.userId = decoded.userId;
            next();
        }
    }
    catch (err) {
        return res.status(403).json({
            msg: "tokens invalid"
        })
    }
}

module.exports = {authMiddleware}