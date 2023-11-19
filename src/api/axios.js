import axios from 'axios';

export default axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

console.log('Base URL:', process.env.REACT_APP_API_URL);
