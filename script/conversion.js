//used to convert the wordPrompts.txt into a json object array

var fs = require('fs')
var text = fs.readFileSync('./wordPrompts.txt').toString('utf-8')
var textByLine = text.split('\n')
var promptArr = textByLine.map(prompt => {
  return {
    name: prompt
  }
})
console.log(promptArr)
promptArr = JSON.stringify(promptArr, null, 2)
fs.writeFileSync('wordPrompts.json', promptArr)
