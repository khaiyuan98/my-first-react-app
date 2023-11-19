import logo from './logo.svg';
import './App.css';
import {TopNavBar} from './components/TopNavBar';
import axios from './api/axios';
import { useEffect, useState } from 'react';
import { Login } from './pages/Login';

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage['accessToken'] != null) {
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
  },[]);

  if (user == null)
  {
    return <div className="App container">
      return <Login setUser={setUser}/>
    </div>
  }

  return (
    <div>
      <TopNavBar user={user} setUser={setUser}/>
    </div>
  );
}

export default App;
