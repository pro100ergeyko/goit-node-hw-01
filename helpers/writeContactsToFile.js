const fs = require("fs/promises");
const { CLIError } = require("./createError");

const writeContactsToFile = async (contacts, contactsPath) => {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log(`Вдалося записати файл ${contactsPath}`.green);
  } catch (error) {
    throw CLIError(`Не вдалося записати в файл ${contactsPath}`.red);
  }
};

module.exports = {
  writeContactsToFile,
};
