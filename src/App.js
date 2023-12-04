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
import RequireAuth from './components/Auth/RequireAuth';
import { LoginPage } from './pages/LoginPage';
import PersistLogin from './components/Auth/PersistLogin';
import { PageNotFound } from './pages/ErrorPages/PageNotFound';
import RequireRole from './components/Auth/RequireRole';
import { UsersPage } from './pages/Admin/UsersPage';
import { MyFooter } from './components/Layouts/MyFooter';


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
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />

          <Route element={<PersistLogin />}>
            {/* Protected routes */}
            <Route element={<RequireAuth />}>
              <Route element={<MyLayout />}>
                <Route exact path="/" element={<Departments />} />
                <Route path="/create" element={<Create />} />
                <Route path="/users" element={<UsersPage />} />

                <Route element={<RequireRole allowedRoles={[ROLES.Departments]} />}>
                  {/* <Route exact path="/" element={<Departments />} /> */}
                </Route>
              </Route>

              {/* Error Pages */}
              <Route exact path="/unauthorized" element={<Unauthorized />} />

              {/* Catch all */}
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Route>
        </Routes>
        <MyFooter />
      </BrowserRouter>
    </ThemeProvider >
  );
}

export default App;
