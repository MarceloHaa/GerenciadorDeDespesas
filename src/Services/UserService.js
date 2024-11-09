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
                    this.logout();
                    window.location.href = '/login';
                }
                return Promise.reject(error);
            }
        );
    }

    async login(dados) {
        try {
            const { data } = await this.axios.post('/login', dados);
            if (data.isSuccess) {
                localStorage.setItem('token', data.value);

                const lastRoute = sessionStorage.getItem('lastAttemptedRoute');
                if (lastRoute) {
                    sessionStorage.removeItem('lastAttemptedRoute');
                    window.location.href = lastRoute;
                }
                return true;
            }
            return false;
        } catch (error) {
            console.error('Erro no login:', error);
            return false;
        }
    }

    usuarioAutenticado() {
        try {
            const token = localStorage.getItem('token');
            if (!token) return false;

            const payload = JSON.parse(atob(token.split('.')[1]));
            const exp = payload.exp * 1000;
            const isExpired = Date.now() >= exp;

            if (isExpired) {
                this.logout();
                return false;
            }

            return true;
        } catch (error) {
            console.error('Erro ao verificar autenticação:', error);
            this.logout();
            return false;
        }
    }

    isAdmin() {
        try {
            const token = localStorage.getItem('token');
            if (!token) return false;

            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.isadmin === '1';
        } catch (error) {
            console.error('Erro ao verificar admin:', error);
            return false;
        }
    }

    getUserName() {
        try {
            const token = localStorage.getItem('token');
            if (!token) return null;

            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.name;
        } catch (error) {
            console.error('Erro ao obter nome do usuário:', error);
            return null;
        }
    }

    async logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        sessionStorage.clear();
    }
}
