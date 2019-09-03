const fs = require("fs")

function getUserToken() {
  return new Promise(function (resolve, reject) {
    fs.readFile("./temp.json" , "utf8", function(err, data){
      if(err){
        return reject("Fail to read file: " + err)
      }
      var jsonData = JSON.parse(data)
      resolve(jsonData.token)
    })
  });
}

function setUserToken(token) {
  try {
    fs.writeFileSync("./temp.json", JSON.stringify(
      {
        "token": token
      }
    ))
  }
  catch (err) {
    console.error(err)
  }
}

module.exports = {
  setUserToken,
  getUserToken
}