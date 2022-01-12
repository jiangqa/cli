const clear = require("clear");
const log = content => console.log(content)
const ora = require("ora");
const createPage = require("../utils/createPage");
const existsFile = require('../utils/existsFile')
const createDir = require('../utils/createDir')
module.exports = async (name,dir) => {
    clear()
    log('🚀🚀🚀🚀创建组件')
    if(dir===undefined){
        log('未指定目录')
        return
    }
    try {
        const dirPath = `./src/views/${dir}/components`
        const viewPath = `${dirPath}/${name}.vue`
        const hasDir = existsFile(dirPath)
        if (!hasDir) {
            const process = ora(`create ${dirPath}`)
            process.start()
            createDir(dirPath)
            process.succeed()
        }
        const hasPage = existsFile(viewPath)
        if (!hasPage) {
            const process = ora(`create ${viewPath}`)
            process.start()
            createPage(viewPath)
            process.succeed()
        }else {
            console.error('文件已存在')
        }
    } catch (err) {
        console.error('err')
    }
}
