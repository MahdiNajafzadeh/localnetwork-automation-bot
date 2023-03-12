const sqlite = require("sqlite3").verbose();
const { databasePath } = require("../../config/database.js");
const database = new sqlite.Database("../database/sqlite.db");
module.exports = database;
