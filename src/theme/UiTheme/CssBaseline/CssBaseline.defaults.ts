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
    color: ${colors.black.main};
  }

  body::-webkit-scrollbar {
    width: 3px;
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

  textarea {
    font-family: ${interFont.style.fontFamily};
    resize: vertical;
  }

  textarea:focus, input:focus{
    outline: none;
  }

    .text-placeholder {
    color: #777777;
  }

::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #777777;
  opacity: 1; /* Firefox */
}

:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: #777777;
}

::-ms-input-placeholder { /* Microsoft Edge */
  color: #777777;
}

// import Skeleton from '@useweb/ui/Skeleton'
@keyframes react-loading-skeleton {
  100% {
      transform: translateX(100%);
  }
}
.react-loading-skeleton {
  --base-color: #ebebeb;
  --highlight-color: #f5f5f5;
  --animation-duration: 1.5s;
  --animation-direction: normal;
  --pseudo-element-display: block; /* Enable animation */

  background-color: var(--base-color);

  width: 100%;
  border-radius: 0.25rem;
  display: inline-flex;
  line-height: 1;

  position: relative;
  overflow: hidden;
  z-index: 1; /* Necessary for overflow: hidden to work correctly in Safari */
}

.react-loading-skeleton::after {
  content: ' ';
  display: var(--pseudo-element-display);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background-repeat: no-repeat;
  background-image: linear-gradient(
      90deg,
      var(--base-color),
      var(--highlight-color),
      var(--base-color)
  );
  transform: translateX(-100%);

  animation-name: react-loading-skeleton;
  animation-direction: var(--animation-direction);
  animation-duration: var(--animation-duration);
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

  // Helpers
  .absoluteCenter {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .blurBackground {
    backdrop-filter: blur(8px);
  }

  // componets 
  .MuiPickersDay-root.Mui-selected {
    color: white !important;
    background-color: ${colors.black.main} !important;
  }
  .MuiPickersYear-yearButton.Mui-selected {
    color: white !important;
    background-color: ${colors.black.main} !important;
  }

`,
}

export default defaults
