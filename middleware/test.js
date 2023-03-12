const sendMessage = require("../services/rocket.chat/sendMessage.js")
module.exports = async (req, res, next) => {
    console.log(await sendMessage("mahdi.najafzadeh", "testing this service !"))
    next()
}