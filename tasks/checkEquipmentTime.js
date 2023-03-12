const sendMessage = require("../services/rocket.chat/sendMessage")
const {findUserData} = require("../services/sqlite/sqliteControl");
const {schedule} = require("node-cron");
const logTime = require("../services/logTime.js")

module.exports = () => {
    schedule("8 * * * * 0,1,2,3,6,7", async () => {
        logTime("INFO : Check Equipment Task is Running ...")
        const todayNumberTime = new Date().getTime();
        const allIssueData = await findUserData({numberTime: todayNumberTime});
        for (const issue of allIssueData) {
            const messageText = `
            با سلام و احترام
کاربر گرامی   ${issue.userName}
با توجه به پایان مهلت استفاده از تجهیز موقتی که در اختیار شما قرار گرفته است، لطفا جهت عودت آن به واحد شبکه اقدام نمایید.
لینک ایشو درخواست شما : ${issue.issueURL}
باتشکر
`
            try {
                await sendMessage(issue.userName, messageText)
                logTime(`INFO : send Message by ID ${issue.issueID} to ${issue.userName} is Success`)
            } catch (error) {
                logTime(`INFO : send Message to ${issue.userName} is Failed`)
            }
        }
    });
}
