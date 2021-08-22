const updateContacts = require("./updateContacts");
const listContacts = require("./listContacts");

const removeContact = async (id) => {
    try {
        const contacts = await listContacts();
        const idx = contacts.findIndex(item => item.id === id);
        if (idx === -1) {
            return null;
        }
        const newContacts = contacts.filter(item => item.id !== id);
        await updateContacts(newContacts);
        return contacts[idx];
    }
    catch (error) {
        throw error;
    }
};

module.exports = removeContact;