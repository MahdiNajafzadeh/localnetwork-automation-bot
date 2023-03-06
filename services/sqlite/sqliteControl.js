const configDatabase = require("./configDatabase");
const addUserData = require("./addUserData");
const findUserData = require("./findUserData");
const deleteUserData = require("./deleteUserData");

module.exports = {
  addUserData: addUserData,
  findUserData: findUserData,
  deleteUserData: deleteUserData,
  configDatabase: configDatabase,
};
