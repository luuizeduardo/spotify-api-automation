require('dotenv').config()
const redis = require('redis')
const cache = redis.createClient()

function deleteCache() {
  cache.del(process.env.KEY_AUTH_TOKEN)
  cache.unref()
}

deleteCache()