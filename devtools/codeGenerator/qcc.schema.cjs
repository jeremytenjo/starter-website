// templates for the `Quick Component Creator` vscode plugin
// https://marketplace.visualstudio.com/items?itemName=tenjojeremy.quick-component-creator

const component = require('./templates/component.cjs')
const story = require('./templates/story.cjs')
const componentWithStory = require('./templates/componentWithStory.cjs')
const functions = require('./templates/function.cjs')
const container = require('./templates/container.cjs')
const page = require('./templates/page.cjs')
const pageContent = require('./templates/pageContent.cjs')
const globalState = require('./templates/globalState.cjs')
const asyncHook = require('./templates/asyncHook.cjs')
const muiOverride = require('./templates/muiOverride.cjs')
const muiOverrideWithStory = require('./templates/muiOverrideWithStory.cjs')
const playwrightTest = require('./templates/playwrightTest.cjs')
const data = require('./templates/data.cjs')
const reactContext = require('./templates/ReactContext.cjs')
const vitestTest = require('./templates/vitestTest.cjs')
const script = require('./templates/script.cjs')
const apiFunction = require('./templates/apiFunction.cjs')

module.exports = [
  container.template,

  component.template,
  componentWithStory.template,

  story.template,

  functions.template,
  apiFunction.template,

  data.template,
  globalState.template,

  playwrightTest.template,
  vitestTest.template,

  muiOverride.template,
  muiOverrideWithStory.template,

  page.template,
  pageContent.template,

  reactContext.template,
  asyncHook.template,
  script.template,
]
