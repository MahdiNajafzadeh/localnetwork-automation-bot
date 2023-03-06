const config = {
    method: "https",
    host: "testchat.partdp.ir",
    port: 443,
    user: "localnetwork-automation-bot",
    password: "zaq1ZAQ!"
}
// import
const RocketChatApi = require('rocketchat').RocketChatApi;
let Bot = new RocketChatApi(config.method, config.host, config.port);

async function getAuthToken() {
    await Bot.login(config.user, config.password, (err, res) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Login !")
            return {userId: res.data.userId, authToken: res.data.authToken}
        }
    })
}

Bot.sendMsg()