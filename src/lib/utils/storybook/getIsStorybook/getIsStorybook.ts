export default function getIsStorybook() {
  const isStorybook = process?.env?.hasOwnProperty('XSTORYBOOK_EXAMPLE_APP') || false

  return isStorybook
}
