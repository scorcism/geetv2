
import './App.css';
import { useTheme, createTheme, ThemeProvider, Typography, Paper } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import red from '@mui/material/colors/red';
import { GlobalContextProvider, useGlobalContext } from './context/memories'
import Memory from './components/Memory';
import AddMemory from './pages/AddMemory';
import Login from './pages/Login';
import Register from './pages/Register';


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
        <GlobalContextProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/memory/:id" element={<Memory />} />
            <Route path="/add" element={<AddMemory />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <Footer />
        </GlobalContextProvider>
    </ThemeProvider>
  );
}

export default App;
