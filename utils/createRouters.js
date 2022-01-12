const fs = require('fs')

const getRouter = (name,dir)=>{
    if(name === dir){
        return `    {
        path: '/${name}',
        name: '${name}',
        component: () => import('@/views/${dir}/${name}.vue')
    },`
    }else {
        return `    {
        path: '/${dir}/${name}',
        name: '${name}',
        component: () => import('@/views/${dir}/${name}.vue')
    },`
    }
}
const getRouters = (name,dir) => {
    return `export default [
${getRouter(name,dir)}
]`
}
const createRouters = (routerPath,name,dir)=>{
    fs.writeFileSync(routerPath, getRouters(name,dir))
}
const createRouter = (routerPath,name,dir) =>{
    const str = fs.readFileSync(routerPath).toString().replace(']', getRouter(name,dir) + `
]`)
    fs.writeFileSync(routerPath, str)
}
const addToRouters = () =>{
    const arr = fs.readdirSync('./src/router')
    let importStr = ''
    let contentStr = ''
    arr.forEach(item=>{
        const name = item.split('.')[0]
        if(name!=='index'&& name!=='routers'){
            importStr = `${importStr}
import ${name} from './${name}'`
            contentStr = `${contentStr}
...${name},`
        }
    })
    const result = `${importStr}
    
export default [
    ${contentStr.slice(0,-1)}
]`
    fs.writeFileSync(`./src/router/routers.ts`,result)
}
module.exports = {
    createRouters,
    createRouter,
    addToRouters
}
