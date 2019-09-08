require('dotenv').config()
const request = require("request")
const cache = require("./services/cache")

function getAuthentication() {

  var options = {
    uri: "https://accounts.spotify.com/api/token",
    method: 'POST',
    headers: {
      "Authorization": "Basic " + (Buffer.from(process.env.SPOTIFY_ID + ":" + process.env.SPOTIFY_SECRET).toString('base64'))
    },
    form: {
      "grant_type": "client_credentials"
    },
    json: true
  };

  return new Promise(function (resolve, reject) {
    request(options, function (error, response, body) {
      if(error){
        return reject("Fail to retrieve acess token: " + error);
      }

      if (body.access_token) {
        cache.setUserToken(body.access_token)
        resolve();
      }
      else {
        reject("Invalid Token")
      }
    });
  });
}

getAuthentication()