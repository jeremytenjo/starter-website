import { type CssBaselineProps } from '@mui/material'
import { type ComponentDefaultsProps } from '@useweb/ui-theme'

import { interFont } from '../../fonts/fonts'
import colors from '../../tokens/colors'

const defaults: ComponentDefaultsProps<CssBaselineProps> = {
  styleOverrides: `
  * {
    box-sizing: border-box;
  }

  html {
    font-family: ${interFont.style.fontFamily};
    overflow-x: hidden;
    scroll-behavior: smooth;
  }

  body {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    box-sizing: border-box;
    margin: 0;
    background-color: ${colors.backgroundColor};
    overflow-x: hidden;
    scrollbar-width: thin;
  }

  body::-webkit-scrollbar {
    width: 8px;
  }

  body::-webkit-scrollbar-thumb {
    background-color: #C1C1C1;
    border-radius: 10px;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    padding: 0;
    margin: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    list-style: none;
  }

  input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0px;
  }

  .firebase-emulator-warning {
    display: none;
  }

  .visually-hidden {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  input {
    border: none;
  }

  textarea:focus, input:focus{
    outline: none;
  }

  // Helpers
  .absoluteCenter {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

`,
}

export default defaults
