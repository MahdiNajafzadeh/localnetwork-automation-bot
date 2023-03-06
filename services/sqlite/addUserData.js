// add Database object
const database = require("./configDatabase");
// Add Log Time --- For debugging and logging
const logTime = require("../logTime");
//-----------------------------------------------------
module.exports = async (issueID, userName, dueDate, issueURL) => {
  try {
    await new Promise((resolve, reject) => {
      database.get(
        "SELECT Count(issueID) AS Count FROM Equipment WHERE issueID = ?",
        [issueID],
        function (error, rows) {
          if (error) {
            logTime("ERROR : Getting a Count User Data From DataBase : ");
            console.log(error);
            reject();
          } else {
            const numberTime = new Date(dueDate).getTime();
            if (rows.Count === 0) {
              database.run(
                `INSERT INTO Equipment VALUES (?,?,?,?,?)`,
                [issueID, userName, dueDate, issueURL, numberTime],
                (error) => {
                  if (error) {
                    logTime("ERROR : Inserting Data to Database : ", error);
                    reject();
                  } else {
                    logTime(`INFO : Add User ${userName} Issue ${issueID} DueDate ${dueDate}`);
                    resolve();
                  }
                }
              );
            } else {
              database.run(
                `UPDATE Equipment
             SET UserName = ? , DueDate = ? , IssueURL = ? , NumberTime = ?
             WHERE issueID = ?`,
                [userName, dueDate, issueURL, numberTime, issueID],
                function (error) {
                  if (error) {
                    logTime("ERROR : Updating Data to Database : ", error);
                    reject();
                  } else {
                    logTime(`INFO : Update User ${userName} Issue ${issueID} DueDate ${dueDate}`);
                    resolve();
                  }
                }
              );
            }
          }
        }
      );
    });
  } catch (error) {
    
  }
};
