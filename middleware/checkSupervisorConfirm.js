const logTime = require("../services/logTime");
const getDataUser = require("../services/ActiveDirctory/getDataUser")
const sendMessage = require("../services/rocket.chat/sendMessage")
const getSupervisorName = require("../utils/getSupervisorName")

module.exports = async (req, res, next) => {
    logTime("START : check Supervisor Confirm (MW)");

    // importing variables
    const objectKind = req.body.object_kind; // issue - note
    const userName = req.body.user.username; // is a Number
    const description = req.body.object_attributes.description; // this is a long text
    const state = req.body.object_attributes.state; // opened - closed
    const action = req.body.object_attributes.action; // open - update - close - reopen
    const url = req.body.object_attributes.url; // issue url
    let closedAt
    try {
        closedAt = req.body.changes.closed_at; // this is use just for undefined or not !
    } catch (error) {
        closedAt = false; // this is use just for undefined or not !
    }

    // check issue model
    if (objectKind === "issue") {
        if (state === "opened" && (action === "open" || action === "update") && !closedAt) {
        } else {
            logTime("INFO : Issue not Open or Before Closed")
            logTime("END : check Supervisor Confirm (MW)");
            next();
            return false;
        }
    } else {
        logTime("INFO : Req Not Issue")
        logTime("END : check Supervisor Confirm (MW)");
        next();
        return false;
    }

    // check issue description
    if (description.includes("تایید سرپرست")) {
        logTime("INFO : Issue description is incorrect.");
    } else {
        logTime("ERROR : Issue description is not incorrect !");
        logTime("END : check Supervisor Confirm (MW)");
        next();
        return false;
    }

    // check confirm checked box in description

    const keywords = ["- [x]  تایید سرپرست", "* [x]  تایید سرپرست", "* [X]  تایید سرپرست", "- [X]  تایید سرپرست"]
    for (const keyword of keywords) {
        if (description.includes(keyword)) {
            logTime("INFO : Supervisor has Approved");
            logTime("END : check Supervisor Confirm (MW)");
            next();
            return false;
        }
    }

    // try to Send Message to Supervisor Team
    try {
        const userTeamName = await getDataUser(userName).userTeamName
        logTime(`INFO : Team is ${userTeamName}`)
        const supervisorUserName = await getSupervisorName(userTeamName)
        logTime(`INFO : Supervisor in this Team is ${supervisorUserName}`)
        const messageToSupervisor = `
با سلام و احترام
سرپرست گرامی ${supervisorUserName}
لطفا در مورد ایشو کاربر ${userName} اعلام نظر نمایید
لینک ایشو : ${url}
    `
        sendMessage(supervisorUserName, messageToSupervisor)
        logTime(`INFO : Send Message to Supervisor is Success`)
    } catch (error) {
        logTime("ERROR : ")
        console.log(error)
    }

    // End of Miidleware !
    logTime("END : check Supervisor Confirm (MW)");
    next()
}