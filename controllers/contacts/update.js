const { Contact } = require("../../models");
const HTTP_CODS = require("../../helpers/httpCodes");

const update = async (req, res, next) => {
    try {
        const { contactId } = req.params
        const updateContact = await Contact.findByIdAndUpdate(
            contactId,
            req.body,
            { new: true }
        )
        if (!updateContact) {
            return res
                .status(HTTP_CODS.BAD_REQUEST)
                .json({
                    message: 'Not found',
                })
        }
        res
            .status(HTTP_CODS.OK)
            .json({ updateContact })
    } catch (error) {
        next(error)
    }
}

module.exports = update;