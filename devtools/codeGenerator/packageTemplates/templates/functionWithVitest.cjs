const functions = require('./function.cjs')
const vitestTest = require('./vitestTest.cjs')

const template = {
  type: 'Function with Vitest',
  files: [...functions.files, ...vitestTest.testFile],
}

module.exports = {
  template,
}
