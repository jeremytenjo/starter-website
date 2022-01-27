const files = [
  {
    path: ({ name }) => `${name}.ts`,
    template: ({ name }) => `type Props = {name}
    
    export default function ${name}({name}: Props) {}`,
  },
]

const template = {
  type: 'Function',
  files,
}

module.exports = {
  files,
  template,
}
