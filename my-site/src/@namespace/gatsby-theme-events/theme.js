import { theme as baseTheme } from 'gatsby-theme-events/src/theme';
// overrule gatsby-theme-ui object
export const theme = {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    primary: 'blue',
  }
}