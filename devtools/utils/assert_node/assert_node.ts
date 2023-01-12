import chalk from 'chalk'

type AssertProps = {
  condition: boolean
  message: string
}

export default function assert_node({ condition, message }: AssertProps) {
  if (condition) {
    console.log(chalk.red('Assertion failed:'))
    console.log(' ')
    console.trace()
    console.log(' ')

    throw message
  }
}
