import colors from '../../../theme/tokens/colors'

export default function gradientText(gradient: string): object {
  const gradientCss = colors.gradient[gradient]

  return {
    background: `-webkit-${gradientCss}`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }
}
