const clone = require('git-clone/promise');
module.exports.clone = async (repo,desc)=>{
    const ora = require('ora')
    const process = ora(`下载...${repo}`)
    process.start()
    await clone(repo,desc)
    process.succeed()
}
