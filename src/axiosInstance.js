import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api', // Adjust the port if needed
});

export default axiosInstance;
