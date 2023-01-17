// templates for the `Super Code Generator` vscode plugin
// https://marketplace.visualstudio.com/items?itemName=tenjojeremy.super-code-generator

const component = require('./templates/component.cjs')
const componentStory = require('./templates/componentStory.cjs')
const componentWithStory = require('./templates/componentWithStory.cjs')
const functions = require('./templates/function.cjs')
const functionStory = require('./templates/functionStory.cjs')
const functionWithStory = require('./templates/functionWithStory.cjs')
const componentWithProvider = require('./templates/componentWithProvider.cjs')
const dataFunction = require('./templates/dataFunction.cjs')
const container = require('./templates/container.cjs')
const page = require('./templates/page.cjs')
const pageContent = require('./templates/pageContent.cjs')
const globalState = require('./templates/globalState.cjs')
const muiOverride = require('./templates/muiOverride.cjs')
const muiOverrideWithStory = require('./templates/muiOverrideWithStory.cjs')
const playwrightTest = require('./templates/playwrightTest.cjs')
const data = require('./templates/data.cjs')
const dataQuery = require('./templates/dataQuery.cjs')
const dataComponent = require('./templates/dataComponent.cjs')
const dataPrismic = require('./templates/dataPrismic.cjs')
const dataVariant = require('./templates/dataVariant.cjs')
const reactContext = require('./templates/ReactContext.cjs')
const vitestTest = require('./templates/vitestTest.cjs')
const script = require('./templates/script.cjs')
const apiFunction = require('./templates/apiFunction.cjs')
const tsSchema = require('./templates/tsSchema.cjs')
const collection = require('./templates/collection.cjs')
const dataComponentUi = require('./templates/dataComponentUi.cjs')

module.exports = [
  container.template,

  component.template,
  componentStory.template,
  componentWithStory.template,

  functions.template,
  functionStory.template,
  functionWithStory.template,
  dataFunction.template,

  apiFunction.template,

  collection.template,
  data.template,
  dataQuery.template,
  componentWithProvider.template,
  dataComponent.template,
  dataComponentUi.template,
  dataVariant.template,
  dataPrismic.template,
  globalState.template,
  reactContext.template,

  tsSchema.template,

  playwrightTest.template,
  vitestTest.template,

  page.template,
  pageContent.template,

  muiOverride.template,
  muiOverrideWithStory.template,

  script.template,
]
