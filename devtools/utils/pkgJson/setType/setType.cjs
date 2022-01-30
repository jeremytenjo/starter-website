const path = require('path')

const editJsonFile = require('edit-json-file')

module.exports = function setType({ type }) {
  const packageJsonPath = path.join(process.cwd(), 'package.json')
  const file = editJsonFile(packageJsonPath)

  file.set('type', type)
  file.save()
}
