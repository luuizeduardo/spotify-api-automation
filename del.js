const fs = require('fs')

const path = './temp.json'

try {
  fs.unlinkSync(path)
  //file removed
} catch(err) {
  console.error(err)
}