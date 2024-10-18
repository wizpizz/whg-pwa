import { Fragment, useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
import Pages from '@/routes/Pages';
import Notifications from '@/sections/Notifications';
import SW from '@/sections/SW';
import useTheme from '@/store/theme';
import themes from '@/theme/themes';

function App() {
  const [currentThemeName, actions] = useTheme();
  const currentTheme = useMemo(() => createTheme(themes[currentThemeName]), [currentThemeName]);

  return (
    <ThemeProvider theme={currentTheme}>
      <Fragment>
        <CssBaseline />
        <Notifications />
        <SW />
        <BrowserRouter>
          <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
            <IconButton onClick={actions.toggle} color="inherit">
              {currentThemeName === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
          <Pages />
        </BrowserRouter>
      </Fragment>
    </ThemeProvider>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
