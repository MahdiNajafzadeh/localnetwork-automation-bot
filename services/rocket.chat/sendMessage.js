const config = require("../../config/rocketChat.js")
const RocketChatApi = require('rocketchat').RocketChatApi;

module.exports = async (username, message) => {
    return await new Promise((resolve,reject)=>{
        const Bot = new RocketChatApi(config.method, config.host, config.port);
        Bot.rocketChatClient.authentication.login(config.user, config.password, async (error) => {
            if (error) {
                console.log("ERROR : Can Not Login ! \n", error)
            } else {
                try {
                    await Bot.rocketChatClient.chat.postMessage({channel: "@" + username, text: message})
                    await Bot.rocketChatClient.authentication.logout((error) => {
                        if (error) {
                            console.log("ERROR : Can Not Logout ! \n", error)
                        }
                    })
                    resolve({success: true})
                } catch (error) {
                    console.log("ERROR : ", error)
                    reject({success: false, error: error})
                }
            }
        })
    })
}