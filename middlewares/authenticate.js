const jwt = require("jsonwebtoken");
const HTTP_CODS = require("../helpers/httpCodes");


const {User} = require("../models/user");
const {SECRET_KEY} = process.env;

const authenticate = async (req, _, next) => {
    try {
        const [bearer, token] = req.headers.authorization.split(" ");
        if (bearer !== "Bearer") {
            res.status(HTTP_CODS.UNAUTHORIZED).json({
            message: "Not authorized"
        })   
        };
        const { id } = jwt.verify(token, SECRET_KEY);
       
        const user = await User.findOne({token});
        if (!user) {
            res.status(HTTP_CODS.UNAUTHORIZED).json({
            message:  "Not authorized"
        })
        }
        req.user = user;
        next();
    }
    catch(error) {
           res.status(HTTP_CODS.UNAUTHORIZED).json({
            message: "Not authorized"
        })
    }
};

module.exports = authenticate;