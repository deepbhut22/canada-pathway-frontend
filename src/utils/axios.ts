import axios from 'axios';

// Create instance
// const api = axios.create({
//     baseURL: 'http://3.98.13.227:5000/api',
// });

const api = axios.create({
    baseURL: 'https://api.pathpr.ca/api',
});

// const api = axios.create({
//     baseURL: 'http://localhost:5000/api',
// });

// Add JWT to headers
// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem('canda-pathway-auth-token');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });
api.interceptors.request.use((config) => {
    const publicRoutes = ['/auth/login', '/auth/register'];

    if (!publicRoutes.some(route => config.url?.includes(route))) {
        const token = localStorage.getItem('canda-pathway-auth-token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }

    return config;
});


// Global error handler
// api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response?.status === 401) {
//             // Handle logout or token refresh
//             localStorage.removeItem('canda-pathway-auth-token');
//             window.location.href = '/login';
//         }
//         return Promise.reject(error);
//     }
// );
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const isAuthRoute = window.location.pathname.includes('/login') || window.location.pathname.includes('/register');

        if (error.response?.status === 401 && !isAuthRoute) {
            localStorage.removeItem('canda-pathway-auth-token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);


export default api;
