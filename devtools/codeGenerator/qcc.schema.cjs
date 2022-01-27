// templates for the `Quick Component Creator` vscode plugin
// https://marketplace.visualstudio.com/items?itemName=tenjojeremy.quick-component-creator

const component = require('./templates/component.cjs')
const story = require('./templates/story.cjs')
const componentWithStory = require('./templates/componentWithStory.cjs')
const functions = require('./templates/function.cjs')
const container = require('./templates/container.cjs')
const page = require('./templates/page.cjs')
const globalState = require('./templates/globalState.cjs')
const asyncHook = require('./templates/asyncHook.cjs')
const cloudFunction = require('./templates/cloudFunction.cjs')

module.exports = [
  component.template,
  story.template,
  componentWithStory.template,
  functions.template,
  container.template,
  page.template,
  globalState.template,
  asyncHook.template,
  cloudFunction.template,
]
