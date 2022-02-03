import colors from '../../tokens/colors'

export default {
  MuiCssBaseline: {
    styleOverrides: `
          @font-face {
            font-family: 'PoppinsRegular';
            font-style: normal;
            font-display: swap;
            src: url('/fonts/poppins/regular.woff2') format('woff2');
          }     
       
          * {
            box-sizing: border-box;
          }

          html {
            overflow-x: hidden;
            scroll-behavior: smooth;
          }

          body {
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            box-sizing: border-box;
            margin: 0;
            overscroll-behavior-y: contain;
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

          ul {
            margin: 0;
            padding: 0;
            list-style: none;
          }

          input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0px;
          }

          .firebase-emulator-warning {
            display: none;
          }

         :root {
           --use-pull-to-refresh-spinner-color: ${colors.primary.main};
          }

        `,
  },
}
