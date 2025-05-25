import axios from 'axios';

// Create instance

// aws
// const api = axios.create({
//     baseURL: 'http://3.98.13.227:5000/api',
// });

const api = axios.create({
    baseURL: 'https://api.pathpr.ca/api',
    withCredentials: true,
});

// const api = axios.create({
//     baseURL: 'http://localhost:5000/api',
//     withCredentials: true,
// });

api.interceptors.request.use((config) => {
    // If you still want to exclude adding credentials for public routes:
    const publicRoutes = ['/auth/login', '/auth/register'];
    if (!publicRoutes.some(route => config.url?.includes(route))) {
        // Nothing needed – browser sends the cookies automatically
    }
    return config;
});

// 🟩 Global error handler – simplified
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Example: redirect to login if 401 and not on auth routes
        const isAuthRoute =
            window.location.pathname.includes('/login') ||
            window.location.pathname.includes('/register');

        if (error.response?.status === 401 && !isAuthRoute) {
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);


export default api;
