
import './App.css';
import { useTheme, createTheme, ThemeProvider, Typography, Paper } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import red from '@mui/material/colors/red';
import { GlobalContextProvider, useGlobalContext } from './context/memories'


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
  return (

    <ThemeProvider theme={theme} >
      <CssBaseline />
      <Paper elevation={0}>
        <GlobalContextProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <Footer />
        </GlobalContextProvider>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
