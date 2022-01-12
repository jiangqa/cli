const fs = require("fs");
const existsFile = (path)=>{
    return fs.existsSync(path)
}
module.exports = existsFile

