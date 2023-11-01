const fs = require("fs/promises");
const contacts = require("./contacts");
const { Command } = require("commander");
const functionAction = require("./actionTypes");

const program = new Command();
program
  .option("-a, --action, <type>", "chose action")
  .option("-i, --id, <type>", "user id")
  .option("-n, --name, <type>", "user name")
  .option("-e, --email, <type>", "user email")
  .option("-p, --phone, <type>", "user phone");

program.parse();

const oprions = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      functionAction.getAllContacts();
      break;

    case "get":
      await functionAction.getContactById(id);
      break;

    case "add":
      await functionAction.addNewContact({ name, email, phone });
      break;

    case "remove":
      await functionAction.removeContactById(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};
