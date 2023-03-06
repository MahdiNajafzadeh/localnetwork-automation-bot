const logTime = require("../services/logTime.js");
const { databasePath, sqlConfigTable } = require("../config/database.js");
const sqlite3 = require("sqlite3").verbose();
const { existsSync } = require("fs");

module.exports = async () => {
  // Checking Database file exists
  if (existsSync(databasePath)) {
    logTime("INFO : Database File already exists.");
    // try to Connect to database
    try {
      const database = new sqlite3.Database(databasePath);
      logTime("INFO : Database Connected.");
      // RUN SQL Command to check database data
      logTime("INFO : Checking Database Config ...");
      if (await database.get("SELECT * FROM Equipment")) {
        logTime("INFO : Database Config is Correct.");
      } else {
        logTime("WARNING : Database may be Corrupted or just Started.");
        logTime("INFO : Config Database Table ...");
        await database.run(sqlConfigTable);
      }
    } catch (error) {
      logTime("ERROR : Can not Connect to Database ! \nError Show ", error);
    }
  } else {
    // if the database file not found , we create a new database and config
    logTime("ERROR : Database File NOT exists !");
    // create a new database
    logTime("INFO : Create New Database ...");
    const database = new sqlite3.Database(databasePath);
    logTime("INFO : Create New Database successfully.");
    // config the new database
    logTime("INFO : Config Database se Table ...");
    // RUN SQL Command for Config Database and import Tables
    if (await database.run(sqlConfigTable)) {
      logTime("INFO : Config Database is successfully.");
    } else {
      logTime("ERROR : Can NOT Config Database !");
    }
  }
};
