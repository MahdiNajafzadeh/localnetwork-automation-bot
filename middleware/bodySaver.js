const { writeFileSync } = require("fs");
module.exports = (req, res, next) => {
  const body = req.body;
  writeFileSync("./bodyJsonSave.json", JSON.stringify(body));
  console.log('Save JSON !');
  next();
};
