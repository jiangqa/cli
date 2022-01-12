const spawn = async (...args) => {
    const {spawn} = require('child_process');
    return new Promise(resolve => {
        const proc = spawn(...args)
        proc.stdout.pipe(process.stdout)
        proc.stdout.pipe(process.stderr)
        proc.on('close', () => {
            resolve()
        })
    })
}
module.exports = spawn
