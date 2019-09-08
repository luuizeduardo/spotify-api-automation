require('dotenv').config()
const redis = require('redis')
const cache = redis.createClient()

function getUserToken() {
  return new Promise(async function (resolve, reject) {
    await cache.get(process.env.KEY_AUTH_TOKEN, function(err, reply) {
      resolve(reply)
    });
    cache.unref()
  })
}

async function setUserToken(token) {
  await cache.set(process.env.KEY_AUTH_TOKEN, token)
  cache.unref()
}

function deleteCache() {
  cache.del(process.env.KEY_AUTH_TOKEN)
  cache.unref()
}

module.exports = {
  setUserToken,
  getUserToken,
  deleteCache
}