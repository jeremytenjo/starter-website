const story = require('./story.cjs')

const template = {
  type: 'Function Story',
  files: story.functionStoryFiles,
  outputWithoutParentDir: true,
}

module.exports = {
  files: story.functionStoryFiles,
  template,
}
