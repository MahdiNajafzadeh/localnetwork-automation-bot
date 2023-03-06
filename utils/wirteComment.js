const postAPI = require("../services/axios/post");
module.exports = (projectID, issueID, body) => {
  let bodyObject = {body: body}
  try {
    if (projectID && issueID ) {
      postAPI(`/projects/${projectID}/issues/${issueID}/notes`, bodyObject)
        .then((res) => {
          if (res.state) {
            console.log(`
            Comment Writing ... Done! 
            state API : ${res.state}
            `);
          } else {
            console.log(`
            Comment Writing ... Failed! 
            state API : ${res.state}
            API Error : ${res.data} 
             `);
          }
        })
        .catch((error) => {
          console.log("Error to write comment : " + error.message);
        });
    } else {
      console.log(`Data not Valid
      projectID : ${projectID}
      issueID : ${issueID}
      Body : \n${body}
      `);
    }
  } catch (error) {
    console.log("Error to write comment : " + error.message);
  }
};

