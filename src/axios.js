import axios from 'axios';

const instance = axios.create({
    // baseURL: 'https://api.openweathermap.org/data/2.5/'
    baseURL: process.env.REACT_APP_API_BASE_URL
});

// instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

export default instance;