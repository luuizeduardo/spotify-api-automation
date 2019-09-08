const cache = require('../services/cache')

after(async function () {
  await cache.deleteCache()
})