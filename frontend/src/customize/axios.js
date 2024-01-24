import axios from 'axios';
import { toast } from 'react-toastify';

// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: 'http://localhost:8080',
});

// fig cái bug không thể gửi cookie từ phía client
instance.defaults.withCredentials = true;

// Alter defaults after instance has been created
// instance.defaults.headers.common['Authorization'] = 'AUTH_TOKEN 123';

// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response.data;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error

        // Any status codes that falls outside the range of 2xx cause this function to trigger
        const status = (error && error.response && error.response?.status) || 500;
        // we can handle global errors here
        switch (status) {
            // authentication (token related issues)
            case 401: {
                toast.error('Unauthorized the user. Please login!');
                // window.location.href = '/login';
                return Promise.reject(error.message, 401);
            }

            // forbidden (permission related issues)
            case 403: {
                toast.error(`you don't permission to access this resource...!`);
                return Promise.reject(error.message, 403);
            }

            // bad request
            case 400: {
                toast.error(error.message);
                return Promise.reject(error.message, 400);
            }

            // not found
            case 404: {
                toast.error(error.message);
                return Promise.reject(error.message, 404);
            }

            // conflict
            case 409: {
                toast.error(error.message);
                return Promise.reject(error.message, 409);
            }

            // unprocessable
            case 422: {
                toast.error(error.message);
                return Promise.reject(error.message, 422);
            }

            // generic api error (server related) unexpected
            default: {
                // toast.error(error.message);
                return Promise.reject(error.message, 500);
            }
        }
    },
);

export default instance;
