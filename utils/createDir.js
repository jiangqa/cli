const fs =require("fs");

const createDir = (dirPath)=>{
    fs.mkdirSync(dirPath)
}

module.exports = createDir
