const logTime = require("../services/logTime");
const getDataUser = require("../services/ActiveDirctory/getDataUser")
const sendMessage = require("../services/rocket.chat/sendMessage")
module.exports = async (req, res, next) => {
    logTime("START : Equipment Time (MW)");

    // importing variables
    const objectKind = req.body.object_kind; // issue - note
    const userName = req.body.user.username; // is a Number
    const issueID = req.body.object_attributes.iid; // and this is a Number
    const description = req.body.object_attributes.description; // this is a long text
    const state = req.body.object_attributes.state; // opened - closed
    const action = req.body.object_attributes.action; // open - update - close - reopen
    const dueDate = req.body.object_attributes.due_date; // 1111-11-11
    const closedAt = req.body.changes.closed_at; // this is use just for undefined or not !
    const url = req.body.object_attributes.url; // issue url

    // check issue model
    if (objectKind === "issue") {
        if (state === "opened" && (action === "open" || action === "update") && !closedAt) {
        } else {
            next();
            return false;
        }
    } else {
        next();
        return false;
    }

    // check issue description
    if (description.includes("تایید سرپرست")) {
        logTime("INFO : Issue description is incorrect.");
    } else {
        logTime("ERROR : Issue description is not incorrect !");
        logTime("END : Equipment Time (MW)");
        next();
        return false;
    }

    const messageToSupervisor = `
    
    `
    const userTeamName = await getDataUser(userName).userTeamName



    next()
    logTime("END : Equipment Time (MW)");
}