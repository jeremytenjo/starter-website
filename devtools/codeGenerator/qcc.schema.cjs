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
const cloudFunction = require('./templates/cloudFunction.cjs')
const muiOverride = require('./templates/muiOverride.cjs')
// const muiOverrideWithStory = require('./templates/muiOverrideWithStory.cjs')
const playwrightTest = require('./templates/playwrightTest.cjs')
const data = require('./templates/data.cjs')
const reactContext = require('./templates/ReactContext.cjs')
const vitestTest = require('./templates/vitestTest.cjs')
const script = require('./templates/script.cjs')

module.exports = [
  container.template,
  component.template,
  story.template,
  componentWithStory.template,
  functions.template,
  data.template,
  playwrightTest.template,
  muiOverride.template,
  muiOverrideWithStory.template,
  page.template,
  pageContent.template,
  globalState.template,
  reactContext.template,
  asyncHook.template,
  cloudFunction.template,
  vitestTest.template,
  script.template,
]
