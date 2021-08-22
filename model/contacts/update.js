const updateContacts = require("./updateContacts");
const listContacts = require("./listContacts");

const update = async (id, updateInfo) => {
    try {
        const contacts = await listContacts();
        const idx = contacts.findIndex(item => item.id === id);
        if (idx === -1) {
            return null;
        }
        contacts[idx] = { ...contacts[idx], ...updateInfo };
        await updateContacts(contacts);
        return contacts[idx];
    }
    catch (error) {
        throw error;
    }
};

module.exports = update;