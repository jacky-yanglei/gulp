const args = require('./build/util/args.js');
const fs = require('fs');
const Npm = require('npm-shell');
const npm = new Npm(__dirname);
const inquirer = require('inquirer');
const clc = require("cli-color");

let tml;
let actName,
  watch;

function creatAct(act) {
  fs.writeFileSync(`src/templates/${act}.html`, tml, {
    encoding: 'utf-8'
  })
  fs.writeFileSync(`src/styles/${act}.scss`, '', {
    encoding: 'utf-8'
  })
  fs.writeFileSync(`src/js/${act}.js`, '', {
    encoding: 'utf-8'
  })
  fs.mkdirSync(`src/images/${act}`)
}

function getActNmae() {
  inquirer.prompt([{
      type: 'input',
      name: 'actName',
      message: clc.green(`请输入专题名？(输入${clc.bgRed('all')}表示开发全部专题):`),
      default: 'all'
    }])
    .then((answer) => {
      if (!answer['actName']) {
        getActNmae()
      } else {
        actName = answer['actName'];
        tml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <link rel="stylesheet" href="/dist/${actName}/${actName}.css">
          <title>Document</title>
        </head>
        <body>
          <script src="/dist/${actName}/${actName}.js"></script>
        </body>
        </html>
        `
        isWatch();
      }
    })
}

function isWatch() {
  inquirer.prompt([{
    type: 'confirm',
    message: clc.green(`是否监听专题文件?(默认为${clc.bgRed('true')})`),
    name: 'isWatch',
    default: true
  }]).then(answer => {
    watch = answer['isWatch']
    console.log(`当前处于${clc.bgRed(answer['isWatch'] ? '监听' : '未监听')}状态`)
    boot()
  })
}

getActNmae();


function boot() {
  if (actName !== 'all') { //  如果act参数存在的话
    fs.readFile(`src/templates/${actName}.html`, (err) => {
      if (err) { // 如果文件不存在就创建
        creatAct(actName)
      }
      if (watch) {
        npm.exec('gulp', ['--watch', true, '--act',actName])
      } else {
        npm.exec('gulp', ['--act', actName])
      }
    })
  } else {
    if (watch) {
      npm.exec('gulp', ['--watch', true])
    } else {
      npm.exec('gulp')
    }
  }
}