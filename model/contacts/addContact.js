const { v4 } = require("uuid");

const listContacts = require("./listContacts");
const updateContacts = require("./updateContacts");

const addContact = async (data) => {
    try {
        const newContact = { ...data, id: v4() };
        const contact = await listContacts();
        contacts.push(newContact);
        await updateContacts(contact);
        return newContact;
    }
    catch (error) {
        throw error;
    }
};

module.exports = addContact;