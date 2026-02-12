import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8082/v1' // Сверь порт со своим бэкендом
});

// Автоматически добавляем JWT токен в заголовки
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;