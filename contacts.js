const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");
const contactsPath = path.join(__dirname, "db/contacts.json");
const { CLIError } = require("./helpers");
require("colors");
const { writeContactsToFile } = require("./helpers");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath);
    console.log(`Файл ${contactsPath} прочитано успішно`.green);
    return JSON.parse(contacts);
  } catch (error) {
    throw CLIError(`В файлі - ${contactsPath}, відсутні дані для читання`.red);
  }
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const [removeContact] = contacts.splice(index, 1);
  await writeContactsToFile(contacts, contactsPath);

  return removeContact;
}

async function addContact(data) {
  const contacts = await listContacts();
  const newContatc = { ...data, id: nanoid() };

  contacts.push(newContatc);
  await writeContactsToFile(contacts, contactsPath);

  return newContatc;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
