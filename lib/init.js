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

module.exports = async (name, template, tool) => {
    clear()
    log('🚀🚀🚀🚀创建项目：' + name)
    const url =
        template === 'h5' ? ''
            : ''
    await clone(url, name)
    await setPackage(name)
    const process = ora(`install node_modules`)
    process.start()
    try {
        await spawn(tool, ['install'], {cwd: `./${name}`})
        await spawn('rm',['-rf','.git'],{cwd: `./${name}`})
        process.succeed()
    }catch (err){
        process.fail('install failed')
    }
    log(`
       cd ${name}
       ${template === 'h5' ? 'npm run dev':'npm run serve'} 
    `)
}
