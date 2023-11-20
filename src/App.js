import logo from './logo.svg';
import './App.css';
import {TopNavBar} from './components/TopNavBar';
import axios from './api/axios';
import { useEffect, useState } from 'react';
import { Login } from './pages/Login';

function App() {

  const [user, setUser] = useState(null);
  const [isAuthenticated, setAuthenticated] = useState(localStorage['accessToken'] != null);

  useEffect(() => {
    setCurrentUser();
  },[isAuthenticated]);

  const setCurrentUser = () => {
    if (isAuthenticated) {
      axios.interceptors.request.use(
        config => {
          // Retrieve the token from your authentication storage (localStorage, cookies, etc.)
          const token = localStorage.getItem('accessToken');
      
          // Add the authorization header if the token exists
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },
        error => {
          return Promise.reject(error);
        });

        axios.get('/auth/user')
        .then(response => {
            setUser(response.data);
        });     
    }
    else {
      setUser(null);
    }
  };

  if (user == null)
  {
    return (
    <div className="App container">
       <Login setAuthenticated={setAuthenticated}/>
    </div>
    );
  }

  return (
    <div>
      <TopNavBar user={user} setAuthenticated={setAuthenticated}/>
    </div>
  );
}

export default App;
