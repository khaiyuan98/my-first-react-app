import logo from './logo.svg';
import './App.css';
import {TopNavBar} from './components/TopNavBar';
import axios from './api/axios';
import { useEffect, useState } from 'react';
import { Login } from './pages/Login';

function App() {

  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    axios.post('/auth/refresh', {}, {withCredentials: true})
    .then(response => {
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;
      setAuthenticated(true);
    })
    .catch(error => {
      console.log('Could not refresh token');
    });
  },[]);

  if (isAuthenticated)
  {
    return (
      <div>
        <TopNavBar  setAuthenticated={setAuthenticated}/>
      </div>
    );
  }

  return (
    <div className="App container">
       <Login setAuthenticated={setAuthenticated}/>
    </div>
    );
}

export default App;
