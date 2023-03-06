// add Database object
const database = require("./configDatabase");
// Add Log Time --- For debugging and logging
const logTime = require("../logTime");
//-----------------------------------------------------
module.exports = (issueID) => {
  try {
    database.run(`DELETE FROM Equipment WHERE IssueID = ?`, [issueID], (error) => {
      if (error) {
        logTime(error);
      }
    });
    // database.close();
  } catch (error) {
    logTime(`Error : ${error}`);
  }
};
