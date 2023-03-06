const putAPI = require("../services/axios/put");
const logTime = require("../services/logTime.js");

module.exports = function (req, res, next) {
  logTime("START : check kerio label (MW)");
  if (checkIssueStatus(req.body)) {
    if (checkIssueDescription(req.body.object_attributes.description)) {
      if (checkCheckedBoxInDescription(req.body.object_attributes.description)) {
        if (addVolumeLabel(req.body, AllLabelsToString(req.body.labels))) {
          logTime("INFO : Added Labels !");
        } else {
          logTime("ERROR : Failed to Add labels");
        }
      } else {
        logTime("ERROR : Checked Box Error!");
      }
    } else {
      logTime("ERROR : Description Error!");
    }
  } else {
    logTime("ERROR : Issue Error!");
  }
  logTime("END : check kerio label (MW)");
  next();
};
/**
 *
 * @param {string} description توضیحات ایشو
 * @returns {boolean}
 * با توجه به نشانه های درون توضیحات ، تشخیص میدهد که این ایشو مرتبط با ایشو کریو است یا خیر
 */
function checkIssueDescription(description) {
  let title1Mark = false,
    title2Mark = false,
    kerioTagMark = false,
    textMark = false;

  if (description) {
    for (const line of description.split("\n")) {
      switch (line) {
        case "## درخواست ترافیک روزانه":
          title1Mark = true;
          break;
        case "**نوع درخواست:**":
          title2Mark = true;
          break;
        case "در صورت نیاز به ترافیک مازاد، وارد کردن اطلاعات زیر الزامیست: ":
          textMark = true;
          break;
        case "@kerio":
          kerioTagMark = true;
          break;
        default:
          break;
      }
    }
    const allMarks = [title1Mark, title2Mark, textMark, kerioTagMark];
    let allTrue = 0;
    for (const mark of allMarks) {
      mark ? allTrue++ : () => {};
    }
    return allTrue >= 3;
  }
}
/**
 *
 * @param {Object} issueInfo
 * با توجه به اطلاعات ایشو میتواند حالتی که صحیح است را تشخیص دهد!
 *
 * حالت های صحیح برای ایشو :
 * 1. ایشو نباید بسته باشد
 * 2. ایشو نباید دوباره باز شده باشد
 * @returns
 */
function checkIssueStatus(dataAPI) {
  const issueInfo = dataAPI.object_attributes;
  if (dataAPI.object_kind === "issue") {
    if (
      issueInfo.state === "opened" &&
      (issueInfo.action === "open" || issueInfo.action === "update") &&
      !dataAPI.changes.closed_at
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

/**
 *
 * @param {string} description
 * چک باکس های درون دیسکریپشن را چک میکند
 *
 * اگر مقدار حجم اضافه تیک خورده باشد ، مقدار درست را برمیگرداند
 * @returns {boolean}
 */
function checkCheckedBoxInDescription(description) {
  let checkedBoxArray = [];
  for (const line of description.split("\n")) {
    if (line.substring(0, 3) === "* [") {
      checkedBoxArray.push(line[3] === "x" || line[3] === "X" ? true : false);
    }
  }
  return checkedBoxArray[0] === false && checkedBoxArray[1] === true ? true : false;
}

/**
 *
 * @param {object} dataAPI اطلاعات دریافتی
 * @param {string} labels لیبل ها با فرم مشخص شده
 * ### اضافه کردن لیبل
 * این تابع تغییرات لیبل را روی ایشو با استفاده از اندپوینت موردنظر اعمال میکند
 *
 * @returns {boolean} صحت کارکرد تابع
 */

async function addVolumeLabel(dataAPI, labels) {
  try {
    const resAPI = await putAPI(`projects/${dataAPI.project.id}/issues/${dataAPI.object_attributes.iid}`, {
      labels: labels,
    });
    if (!resAPI.state) {
      logTime("ERROR : in {addVolumeLabel} (try) ");
    }
    return resAPI.state;
  } catch (ERROR) {
    logTime("ERROR : in {addVolumeLabel} (catch) : " + ERROR);
    return false;
  }
}
/**
 *
 * @param {object} dataAPI
 * این تابع با توجه به فرم ورود لیبل ها ، لیبل های قبلی را نیز اضافه میکند
 *
 * این عمل از پاک شدن لیبل های قبلی جلوگیری میکند
 * @returns {string}
 */
function AllLabelsToString(labels) {
  return labels.join(",") + ",حجم اضافه";
}
