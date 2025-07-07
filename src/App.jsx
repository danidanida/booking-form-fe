import React from 'react';
import BookingForm from './components/BookingForm';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: '"Plus Jakarta Sans", sans-serif',
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

