const sqlite = require("sqlite3").verbose();
const { databasePath } = require("../../config/database.js");
const database = new sqlite.Database(databasePath);
module.exports = database;
