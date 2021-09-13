const fs = require("fs/promises");
const path = require("path");
var Jimp = require('jimp');
const HTTP_CODS = require("../../helpers/httpCodes");

const { User } = require("../../models/user");

const imageDir = path.join(__dirname, "../../", "public/images");


const updateImg = async (req, res) => {
    const { id } = req.params;
    const { path: tempPath, originalname } = req.file;
    const uploadPath = path.join(imageDir,  originalname);
    try {
        const file = await Jimp.read(tempPath);
        await file.resize(255, 255).write(tempPath)
        await fs.rename(tempPath, uploadPath);
        const image = `/images/${id}/${originalname}`;
        await User.findByIdAndUpdate(id, { image });
        res.status(HTTP_CODS.OK)
            .json({
                status: "success",
                message: "update image",
                data: {
                    result: image
                }
            })
    } catch (error) {
        await fs.unlink(tempPath);
        throw error;
    }
};

module.exports = updateImg;