// main package importing
const express = require("express");
const app = new express();
const bodyParser = require("body-parser");
const cors = require("cors");
// Middleware importing
// const checkTeamNameLabel = require("./middleware/checkTeamNameLabel");
// const checkKeriolabel = require("./middleware/checkKeriolabel");
// const equipmentTime = require("./middleware/equipmentTime");
const checkSupervisorConfirm = require("./middleware/checkSupervisorConfirm.js")
// const bodySaver = require("./middleware/bodySaver");
// const test = require("./middleware/test")
// variables importing
let count = 0;
// cron jobs importing
const checkEquipmentTime = require("./tasks/checkEquipmentTime.js");
// (Run on Running Server tasks) importing
const checkDatabase = require("./tasks/checkDatabase.js");
// main package configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// app configuration
app.post("/", [checkSupervisorConfirm], (req, res) => {
  if (req.body) {
    count++;
    console.log("New Req --> Count:", count);
  }
  res.status(204).end();
});

app.listen(3002, async () => {
  await checkDatabase();
  console.log("Server --> Run --> 127.0.0.1:3002");
  checkEquipmentTime()
});
