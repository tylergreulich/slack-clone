import * as React from 'react';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      containedPrimary: {
        width: '30rem',
        marginTop: '1.2rem',
        fontSize: '1.7rem',
        backgroundColor: 'rgba(99, 193, 160, 0.7)',
        '&:hover': {
          backgroundColor: 'rgba(99, 173, 130, 0.7)'
        }
      }
    },
    MuiFormLabel: {
      root: {
        fontSize: '2rem',
        '&$focused': {
          color: 'rgba(99, 193, 160, 0.7)'
        }
      },
      error: {
        fontSize: '1.4rem'
      }
    },
    MuiInput: {
      root: {
        fontSize: '2rem'
      },
      underline: {
        '&:after': {
          // underline color when textfield is inactive
          borderBottom: '2px solid rgba(99, 193, 160, 0.7)'
        },
        '&:hover:not($disabled):not($focused):not($error):before': {
          borderBottom: '2px solid rgba(99, 193, 160, 0.7)'
        }
      }
    },
    MuiTypography: {
      display2: {
        fontSize: '5rem'
      }
    }
  }
});

export const ThemeWrapper = (props: any) => (
  <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
);
