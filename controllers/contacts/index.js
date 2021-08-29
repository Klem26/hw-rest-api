const listContacts = require("./listContacts");
const getContactById = require("./getContactById");
const addContact = require("./addContact");
const update = require("./update");
const removeContact = require("./removeContact");
const updateStatusContact = require("./updateStatusContact")

module.exports = {
    listContacts,
    getContactById,
    addContact,
    update,
    removeContact,
    updateStatusContact

}