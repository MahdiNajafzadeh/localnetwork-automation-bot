// add Database object
const database = require("./configDatabase");
// Add Log Time --- For debugging and logging
const logTime = require("../logTime");
//-----------------------------------------------------
/**
 * @param {Number} issueID
 * @param {boolean} selectAll
 * @returns {Array} list of Row Objects
 */
module.exports = async (issueID, selectAll) => {
  try {
    if (selectAll) {
      database.all(`SELECT * FROM Equipment`, (err, rows) => {
        if (err) {
          logTime(err);
        } else {
          logTime(rows)
          return rows;
        }
      });
    } else {
      database.all(
        `SELECT * FROM Equipment
        WHERE IssueID = ?`,
        [issueID],
        (err, rows) => {
          if (err) {
            logTime(err);
          } else {
            if (rows.length === 1) {
              logTime("Found : issueID = " + row[0].issueID);
              return rows[0];
            } else if (rows.length === 0) {
              logTime("Error : Not Found !")
            } else {
              logTime("Error : More than 1 Rows Found! -- check your database");
            }
          }
        }
      );
    }
    // database.close();
  } catch (error) {
    logTime(`Error : ${error}`);
  }
};
