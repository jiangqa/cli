const clear = require("clear");
const log = content => console.log(content)
const ora = require("ora");
const createPage = require('../utils/createPage')
const {createRouters, createRouter,addToRouters} = require('../utils/createRouters')
const createDir = require('../utils/createDir')
const existsFile = require('../utils/existsFile')
module.exports = async (name, dir) => {
    clear()
    log('🚀🚀🚀🚀创建.vue文件及路由')
    if(!dir)  dir = name
    try {
        const dirPath = `./src/views/${dir}`
        const viewPath = `${dirPath}/${name}.vue`
        const routerPath = `./src/router/${dir}.ts`
        const hasDir = existsFile(dirPath)
        if(!hasDir){
            const process = ora(`创建 ${dirPath}`)
            process.start()
            createDir(dirPath)
            process.succeed()
        }
        const hasPage = existsFile(viewPath)
        if(hasPage){
            log('文件已存在')
        }else {
            const process = ora(`创建 ${viewPath}`)
            process.start()
            createPage(viewPath)
            process.succeed()

            if(existsFile(routerPath)){
                const process1 = ora(`添加路由 ${routerPath}`)
                process1.start()
                createRouter(routerPath, name,dir)
                process1.succeed()
            }else {
                const process1 = ora(`创建路由 ${routerPath}`)
                process1.start()
                createRouters(routerPath,name,dir)
                process1.succeed()
                const process2= ora('刷新路由...')
                process2.start()
                addToRouters()
                process2.succeed()
            }
        }
    } catch (err) {
        console.error(err.toString())
    }
}
