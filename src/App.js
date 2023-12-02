import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Create } from './pages/Create';
import { Departments } from './pages/Departments';
import CssBaseline from '@mui/material/CssBaseline';
import defaultTheme from './themes/theme';
import { createTheme, ThemeProvider } from '@mui/material';
import { MyLayout } from './components/Layouts/MyLayout';
import { useSelector } from 'react-redux';
import { Unauthorized } from './pages/ErrorPages/Unauthorized';
import RequireAuth from './components/RequireAuth';
import { Login } from './pages/Login';
import PersistLogin from './components/PersistLogin';
import { PageNotFound } from './pages/ErrorPages/PageNotFound';


function App() {
  const ROLES = {
    'Creator': 100,
    'Departments': 200
  }

  // From redux
  const isDarkMode = useSelector(state => state.darkMode.isDarkMode);
  const themeSettings = defaultTheme(isDarkMode ? 'dark' : 'light');
  const theme = createTheme(themeSettings);

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <BrowserRouter>
        <Route path="/login" element={<Login />} />
        <MyLayout>
          <Routes>
            {/* Public routes */}
            <Route exact path="/unauthorized" element={<Unauthorized />} />

            {/* Protected routes */}
            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth allowedRoles={[ROLES.Departments]} />}>
                <Route exact path="/" element={<Departments />} />
              </Route>

              <Route element={<RequireAuth />}>
                <Route path="/create" element={<Create />} />
              </Route>
            </Route>

            {/* Catch all */}
            <Route path="*" element={<PageNotFound />} />

          </Routes>
        </MyLayout>
      </BrowserRouter>
    </ThemeProvider >
  );
}

export default App;
