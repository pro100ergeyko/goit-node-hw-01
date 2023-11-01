const contacts = require("./contacts");
const { CLIError } = require("./helpers");
const { ctrlWrapper } = require("./helpers");
require("colors");

const getAllContacts = async () => {
  const allContacts = await contacts.listContacts();

  if (!allContacts) {
    return;
  }

  console.log(allContacts);
};

const getContactById = async (id) => {
  const contactById = await contacts.getContactById(id);

  if (!contactById) {
    throw CLIError("Контакти з таким ID відсутні");
  }

  console.log(contactById);
};

const addNewContact = async (data) => {
  if (!data.name || !data.email || !data.phone) {
    throw CLIError("Вибачте 🤷‍♂️, але немає всіх контактних даних");
  }

  const newContatc = await contacts.addContact(data);
  console.log(newContatc);
  return newContatc;
};

const removeContactById = async (id) => {
  const contactDelete = await contacts.removeContact(id);

  if (!contactDelete) {
    throw CLIError("Упс, контактс з вказаним ID - відсутній");
  }

  console.log(contactDelete);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addNewContact: ctrlWrapper(addNewContact),
  removeContactById: ctrlWrapper(removeContactById),
};
