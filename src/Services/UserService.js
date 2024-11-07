import axios from 'axios';

export default class UserServices {
    constructor() {
        this.axios = axios.create({
            baseURL: process.env.REACT_APP_API + '/Authentication',
        });
        this.axios.interceptors.request.use((config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
        this.axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                }
                return Promise.reject(error);
            }
        );
    }

    async login(dados) {
        const { data } = await this.axios.post('/login', dados);
        if (data.isSuccess) {
            localStorage.setItem('token', data.value);

            return true;
        }

        return false;
    }
    usuarioAutenticado() {
        const token = localStorage.getItem('token');
        if (!token) return false;

        const payload = JSON.parse(atob(token.split('.')[1]));
        const exp = payload.exp * 1000;
        const isExpired = Date.now() >= exp;
        return !isExpired;
    }
    isAdmin() {
        const token = localStorage.getItem('token');
        if (!token) return false;

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.isadmin === '1';
        } catch (error) {
            console.error('Erro ao decodificar token:', error);
            return false;
        }
    }

    getUserName() {
        const token = localStorage.getItem('token');
        if (!token) return null;

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.name;
        } catch (error) {
            console.error('Erro ao decodificar token:', error);
            return null;
        }
    }

    async cadastrar(dados) {
        return this.axios.post('/register', dados);
    }
    async logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
    }
}
