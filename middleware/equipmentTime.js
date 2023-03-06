const logTime = require("../services/logTime");
const addUserData = require("../services/sqlite/addUserData");
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
  const keywords = ["## درخواست تجهیزات", "#### نوع تجهیز", "## نوع تخصیص", "#### روزانه", "#### موقت", "#### دائمی"];
  if (
    description
      .split("\n")
      .map((value) => value.trim())
      .filter((value) => value.substring(0, 1) === "#")
      .filter((value) => keywords.includes(value)).length === 6
  ) {
    logTime("INFO : Issue description is incorrect.");
  } else {
    logTime("ERROR : Issue description is not incorrect !");
    logTime("END : Equipment Time (MW)");
    next();
    return false;
  }
  // check checked boxes

  const checkBox = description
    .split("\n")
    .map((value) => value.trim())
    .filter((value) => /[\*,\-] \[[\x,\X, ]\]/.test(value));

  const checkBoxModelRequestChecked = [checkBox[0], checkBox[1], checkBox[3]].filter(
    (value) => value[3].toLowerCase() === "x"
  );

  let modelRequest = "empty";
  if (checkBoxModelRequestChecked.length === 1) {
    switch (true) {
      case checkBoxModelRequestChecked[0].includes("روزانه"):
        modelRequest = "Day";
        break;
      case checkBoxModelRequestChecked[0].includes("موقت"):
        modelRequest = "temp";
        break;
      case checkBoxModelRequestChecked[0].includes("دائمی"):
        modelRequest = "perm";
        break;
      default:
        logTime("ERROR : Invalid checkBox Model Request");
        logTime("END : Equipment Time (MW)");
        next();
        return false;
        break;
    }
  } else if (checkBoxModelRequestChecked.length === 0) {
    logTime("ERROR : User not Choosing a checkBox !");
    logTime("END : Equipment Time (MW)");
    next();
    return false;
  } else {
    logTime("ERROR : User Selected Multiple CheckBox !");
    logTime("END : Equipment Time (MW)");
    next();
    return false;
  }

  if (modelRequest !== "temp") {
    logTime("INFO : User Selected the another checkBox ...");
    logTime("END : Equipment Time (MW)");
    next();
    return false;
  }

  // check dueDate variable
  if (!dueDate) {
    logTime("ERROR : User Not Selected the due date !");
    logTime("END : Equipment Time (MW)");
    next();
    return false;
  }

  try {
    await addUserData(issueID, userName, dueDate, url);
  } catch (error) {
    logTime("ERROR : unknown error : " + error.message);
  }

  logTime("END : Equipment Time (MW)");
  next();
};
