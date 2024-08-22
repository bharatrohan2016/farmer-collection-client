import { createTheme } from '@mui/material/styles';

// Define your Bharatrohan colors
const BharatrohanTheme = createTheme({
  palette: {
    primary: {
      main: '#193c34', // Replace with Bharatrohan primary color
    },
    danger: {
      main: '#b22222', // Replace with Bharatrohan primary color
    },
    secondary: {
      main: '#C70039', // Replace with Bharatrohan secondary color
    },
    background: {
      default: '#F1F1F1', // Replace with Bharatrohan background color
    },
    text: {
      primary: '#212121', // Replace with Bharatrohan primary text color
      secondary: '#757575', // Replace with Bharatrohan secondary text color
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', // Customize with Bharatrohan fonts if needed
  },
  // Add any additional custom styles here
});

export default BharatrohanTheme;
