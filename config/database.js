module.exports = {
  databasePath: "./database/sqlite.db",
  sqlConfigTable:
    "CREATE TABLE IF NOT EXISTS Equipment (issueID int,userName varchar(50),dueDate varchar(10),issueURL text,numberTime int,PRIMARY KEY (issueID))",
};
