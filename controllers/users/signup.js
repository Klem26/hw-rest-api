const bcrypt = require("bcryptjs");
const fs = require("fs/promises");
const path = require("path");
const gravatar = require("gravatar");


const HTTP_CODS = require("../../helpers/httpCodes");
const { User } = require("../../models");
const imageDir = path.join(__dirname, "../../", "public/images");

const signup = async (req, res) => {
    const { email, password } = req.body;
    const defaultImage = gravatar.url({email}, { s: 250 }, true);
    const user = await User.findOne({email});
    if (user) {
        return res.status(HTTP_CODS.CONFLICT)
            .json({
                status: "error",
                message: "Already register"
        })
        
    }

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const result = await User.create({email ,image:`https:${defaultImage}`, password: hashPassword});
    const id = result._id.toString();
    const dirPath = path.join(imageDir, id);
    await fs.mkdir(dirPath)
    res.status(HTTP_CODS.CREATED)
        .json({
        status: "success",
        code: 201,
        message: "Success register"
    })
};

module.exports = signup;