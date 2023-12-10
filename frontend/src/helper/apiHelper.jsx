import axiosDefault from 'axios';
// import Cookies from 'js-cookie';

// Set default axios settings.
const axios = axiosDefault.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "ngrok-skip-browser-warning": "69420", 
    },
});

// axios.interceptors.request.use(
//     (config) => {
//         const token = Cookies.get('acctoken');
//         if (token) {
//             config.headers['Authorization'] = `${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// )

export default axios;
