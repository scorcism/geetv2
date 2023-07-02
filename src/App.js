
import './App.css';
import { useTheme, createTheme, ThemeProvider, Typography, Paper } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import red from '@mui/material/colors/red';


function App() {
  const theme = createTheme({
    palette: {
      secondary: {
        main: "#FF0000",
        dark: red[900]
      },
      primary: {
        main: "#ffff"
      },
      mode: 'dark'
    }
  })
  console.log(theme)
  return (

    <ThemeProvider theme={theme} >
      <CssBaseline />
      <Paper elevation={0}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </Paper>
    </ThemeProvider>
  );
}

export default App;
