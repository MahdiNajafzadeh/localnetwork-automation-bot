// add Database object
const database = require("./configDatabase");
// Add Log Time --- For debugging and logging
const logTime = require("../logTime");
const {response} = require("express");
//-----------------------------------------------------
/**
 * @function
 * @description Get Data From DataBase
 * @param {Number} issueID
 * @param {boolean} selectAll
 * @returns {Array} list of Row Objects
 */
module.exports = async (data) => {
    try {
        if (data.selectAll) {
            return await new Promise((resolve, reject) => {
                database.all(`SELECT * FROM Equipment`, (err, rows) => {
                    if (err) {
                        logTime(err);
                        reject(err)
                    } else {
                        resolve(rows);
                    }
                });
            })
        } else if (data.issueID) {
            return await new Promise((resolve, reject) => {
                database.all(`SELECT * FROM Equipment WHERE IssueID =< ?`, [data.issueID], (err, rows) => {
                    if (err) {
                        logTime(err);
                        reject(err)
                    } else {
                        if (rows.length === 1) {
                            resolve(rows[0]);
                        } else if (rows.length === 0) {
                            reject("Error : Not Found !")
                        } else {
                            reject("Error : More than 1 Rows Found! -- check your database");
                        }
                    }
                });
            })
        } else if (data.numberTime) {
            return await new Promise((resolve, reject) => {
                database.all(`SELECT * FROM Equipment WHERE numberTime < ${(new Date().getTime())}`, (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            })
        }
    } catch (error) {
        logTime(`Error : ${error}`);
    }
}
