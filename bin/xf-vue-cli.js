#!/usr/bin/env node
const program = require('commander');
const action = require('../lib/init')
const inquirer = require('inquirer')
const insertRouter = require('../lib/insert-router')
const insertComponent = require('../lib/insert-component')
const project = {
    '供应链': {'基地erp-admin': '', '基地erp-h5': '', '基地erp-service': ''},
    'POS': {'POS-admin': '', 'POS-iot': '', 'POS-service': '', 'POS-Android': ''},
    '数据':{'数据门户-admin':'git@codeup.aliyun.com:xianfengsg/datagroup/data-portal.git','数据门户-h5':''}
}
const initProject = {
    h5: "git@codeup.aliyun.com:xianfengsg/web/vue3-h5.git",
    admin: 'git@codeup.aliyun.com:xianfengsg/web/vue3-admin.git'
}

const promptList = [
    {
        type: 'list',
        message: 'which tool is best',
        name: 'tool',
        default: 'npm',
        choices: [
            "npm",
            "yarn",
            "cnpm"
        ]
    },
    {
        type: 'list',
        message: 'which template you want',
        name: 'template',
        default: 'admin',
        choices: [
            "admin",
            "h5"
        ]
    }
]

program.version(require('../package.json').version, '-v,--version')
program.command('project')
    .alias('p')
    .description('init project')
    .action(() => {
        const choices = Object.keys(project)
        const list = [
            {
                type: 'list',
                message: 'which menu you want',
                name: 'menu',
                default: choices[0],
                choices: choices
            }]

        inquirer.prompt(list).then(async newAnswer => {
            const { menu} = newAnswer
            const choices1 = Object.keys(project[menu])
            const newList = [{
                type: 'list',
                message: 'which project you want',
                name: 'projectName',
                default: choices1[0],
                choices: choices1
            }]
            inquirer.prompt(newList).then(async project_name => {
                const {projectName} = project_name
                const url = project[menu][projectName]
                await action(projectName, url, 'npm', false)
            })
        })
    })
program.command('init <name>')
    .description('init project')
    .alias('i')
    .action(name => {
        inquirer.prompt(promptList).then(async answer => {
            const {template, tool} = answer
            await action(name, initProject[template], tool,true)
        })
    })

program.command('page <name> [dirPath]')
    .description('insert page')
    .action(async (name, dirPath) => {
        await insertRouter(name, dirPath)
    })
program.command('component <name> [dirPath]')
    .description('insert page')
    .action(async (name, dirPath) => {
        await insertComponent(name, dirPath)
    })
program.parse(process.argv)

