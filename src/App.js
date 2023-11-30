import './App.css';
import axios from './api/axios';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Create } from './pages/Create';
import { Departments } from './pages/Departments';
import CssBaseline from '@mui/material/CssBaseline';
import defaultTheme from './themes/theme';
import { createTheme, ThemeProvider } from '@mui/material';
import { MyLayout } from './components/Layouts/MyLayout';
import { useSelector } from 'react-redux';


function App() {

  const [isAuthenticated, setAuthenticated] = useState(false);

  // From redux
  const isDarkMode = useSelector(state => state.darkMode.isDarkMode);

  useEffect(() => {
    axios.post('/auth/refresh', {}, { withCredentials: true })
      .then(response => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;
        setAuthenticated(true);
      })
      .catch(error => {
        console.log('Could not refresh token');
      });

  }, []);

  const themeSettings = defaultTheme(isDarkMode ? 'dark' : 'light');
  const theme = createTheme(themeSettings);

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <BrowserRouter>
        <MyLayout>
          <Routes>
            <Route exact path="/" element={<Departments />} />
            <Route path="/create" element={<Create />} />
          </Routes>
        </MyLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
