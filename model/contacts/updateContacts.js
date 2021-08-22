const fs = require("fs/promises");

const filePath = require("./filePath");

const updateContacts = async (contacts) => {
    const productsString = JSON.stringify(contacts);
    await fs.writeFile(filePath, productsString);
};

module.exports = updateContacts;