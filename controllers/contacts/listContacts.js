const contactsOperations = require("../../model/contacts");

const listContacts = async (req, res, next) => {
    try {
        const listContacts = await contactsOperations.listContacts();
        res.json({ listContacts })


    } catch (error) {
        next(error)
    }

}
module.exports = listContacts;