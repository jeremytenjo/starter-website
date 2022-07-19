module.exports = {
  changeCase: { ...require('change-case'), lowerCase: require('lower-case').lowerCase },
  wrapInTemplateLiteral: require('./wrapInTemplateLiteral.cjs'),
  addEmptyTemplateLiteral: require('./addEmptyTemplateLiteral.cjs'),
}
