// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/useweb/UsewebThemeProvider.jsx
import { type ComponentDefaultsProps } from '@useweb/ui-theme';
import { type DividerProps } from '@useweb/ui/Divider';

import colors from '../../../../theme/tokens/colors';

const defaults: ComponentDefaultsProps<DividerProps> = {
  styleOverrides: {
    root: {
      backgroundColor: colors.gray.light,
    },
  },
};

export default defaults;
