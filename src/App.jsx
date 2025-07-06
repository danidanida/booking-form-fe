import React from 'react';
import BookingForm from './components/BookingForm';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: '"Plus Jakarta Sans", sans-serif',
  },
  palette: {
    mode: 'light',
    secondary: {
      light: '#8074FF',
      main: '#4B27FE',
      dark: '#3C1FE2',
    },
    error: {
      main: '#E54A1F',
    },
    warning: {
      main: '#FFB533',
    },
    info: {
      main: '#7158FF',
    },
    success: {
      main: '#FF9679',
    },
    text: {
      primary: '#181818',
      secondary: '#53504A',
    },
    background: {
      default: '#FCF7F0',
      paper: '#FFFFFF',
    },
    divider: '#C8C0B6',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          backgroundColor: '#ffffff',
          colorScheme: 'light',
        },
      },
    },
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container maxWidth="md" sx={{ py: 4, mx: 0 }}>
      <BookingForm />
    </Container>
  </ThemeProvider>
);

export default App;

