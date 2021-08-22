const listContacts = require("./listContacts");


const getContactById = async (id) => {
    try {
        const contacts = await listContacts();
        const selectContacts = contacts.find(item => item.id === id);
        if (!selectContacts) {
            return null;
        }
        return selectContacts;
    }
    catch (error) {
        throw error;
    }
};

module.exports = getContactById;