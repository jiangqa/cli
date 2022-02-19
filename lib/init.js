const clear = require('clear')
const log = content => console.log(content)
const {clone} = require('./download')
const fs = require("fs");
const ora = require('ora')
const spawn = require('../utils/spawn')
function setPackage(projectName) {
    const answers = {name: projectName}
    const packagePath = `./${projectName}/package.json`
    const packageJson = fs.readFileSync(packagePath, 'utf-8')
    const packageResult = JSON.stringify(Object.assign({}, JSON.parse(packageJson), answers), null, 4)
    fs.writeFileSync(packagePath, packageResult)
}

module.exports = async (name, template, tool,isInstall=false) => {
    clear()
    let newName = name
    if(!isInstall){
        const arr = template.split('/')
        const nameStr = arr[arr.length-1]
        const nameArr = nameStr.split('.')
        newName = nameArr[0]
    }
    log('🚀🚀🚀🚀初始化项目：' + newName)
    await clone(template,newName)
    if(isInstall){
        await setPackage(name)
        const process = ora(`install node_modules`)
        process.start()
        try {
            if(isInstall){
                await spawn(tool, ['install'], {cwd: `./${name}`})
                await spawn('rm',['-rf','.git'],{cwd: `./${name}`})
            }
            process.succeed()
        }catch (err){
            process.fail('install failed')
        }
    }
    log(`
       cd ${name}
    `)
}
