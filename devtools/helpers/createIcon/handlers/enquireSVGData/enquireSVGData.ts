// https://github.com/enquirer/enquirer
import enquirer from 'enquirer'

type EnquireSVGDataReturn = {
  iconName: string
  svgString: string
}

export default async function enquireSVGData(): Promise<EnquireSVGDataReturn> {
  // https://github.com/enquirer/enquirer#-built-in-prompts
  const { iconName, svgString }: EnquireSVGDataReturn = await enquirer.prompt([
    {
      type: 'input',
      name: 'iconName',
      message: 'Icon name',
    },
    {
      type: 'input',
      name: 'svgString',
      message: 'SVG tag',
      multiline: true,
    },
  ])

  return { iconName, svgString }
}
