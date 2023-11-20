import defaultAxios from 'axios';

let axios = defaultAxios.create();
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

let refresh = false;

// Remove access token if received error 401
axios.interceptors.response.use(
    response => response,
    async error => {
        if (error.response.status === 401 && !refresh) {
            refresh = true;

            const response = await axios.post('/auth/refresh', {}, {withCredentials: true});

            if (response.status === 200) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;
            }

            return axios(error.config);
        }
        refresh = false;
        return error;
    });

console.log('Base URL:', process.env.REACT_APP_API_URL);

export default axios;
