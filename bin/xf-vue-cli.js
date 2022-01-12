#!/usr/bin/env node
const program = require('commander');
const action = require('../lib/init')
const inquirer = require('inquirer')
const insertRouter = require('../lib/insert-router')
const insertComponent = require('../lib/insert-component')
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
program.command('init <name>')
    .description('init project')
    .action(name => {
        inquirer.prompt(promptList).then(async answer => {
            const {template, tool} = answer
            await action(name, template,tool)
        })
    })

program.command('page <name> [dirPath]')
    .description('insert page')
    .action(async (name,dirPath)=>{
        await insertRouter(name,dirPath)
    })
program.command('component <name> [dirPath]')
    .description('insert page')
    .action(async (name,dirPath)=>{
        await insertComponent(name,dirPath)
    })
program.parse(process.argv)

