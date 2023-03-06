const { findUserData } = require("../services/sqlite/sqliteControl");
const { schedule } = require("node-cron");

schedule("* * 8 * * 0,1,2,3,6,7", async () => {
  // const allIssueData = findUserData((selectAll = true));
  const todayNumberTime = new Date().getTime();
  let allIssueData = await findUserData("", true);
  let issueForMessage = [];
  for (const issueData of allIssueData) {
    if (issueData.numberTime <= todayNumberTime) {
      issueForMessage.push(issueData);
    }
  }
  for (const issue of issueForMessage) {
    messageToUser(issue.userName, issue.url);
  }
});

module.exports = () => {};
