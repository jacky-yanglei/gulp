const yargs = require('yargs');
const args = yargs
  .option('watch', {
    boolean: true,//选项值类型
    default: false,//默认值 如果不输入选项的话该选项的默认值
    describe: '是否监听',
})
  .option('act', {
    string: '',
    default: '',
    boolean: false,
    describe: '是否是单独开发某个专题',
}).argv

module.exports = args;