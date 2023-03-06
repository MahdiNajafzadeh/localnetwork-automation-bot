// import Config
const config = require("../../config/config");
// import package
const axios = require("axios");
// set variables
const token = config.token;
// set Config For Requests
const API = axios.create({
  baseURL: config.baseURL,
  timeout: 5000,
  headers: { Authorization: "Bearer " + token },
});
// Export Module
module.exports = async (path, body) => {
  try {
    // Send Request
    response = await API.put(path, body);
    // Check Response
    if (response.data) {
      return { state: true, data: response.data };
    } else {
      return { state: false, data: response.statusCode };
    }
  } catch (error) {
    // Error Handle
    console.log("Error to Send Request ! --> " + error.message);
    return { state: false, data: false };
  }
};
