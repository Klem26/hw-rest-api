const bcrypt = require("bcryptjs");
const HTTP_CODS = require("../../helpers/httpCodes");

const { User } = require("../../models");

const signup= async(req, res ) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (user) {
        return res.status(HTTP_CODS.CONFLICT)
            .json({
                status: "error",
                message: "Already register"
        })
        
    }

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const result = await User.create({email, password: hashPassword});
    res.status(201).json({
        status: "success",
        code: 201,
        message: "Success register"
    })
};

module.exports = signup;