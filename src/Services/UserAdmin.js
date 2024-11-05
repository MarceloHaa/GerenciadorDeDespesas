import axios from 'axios';

export default class UserAdmin {
    constructor() {
        this.axios = axios.create({
            baseURL: process.env.REACT_APP_API + '/api/user',
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
                    window.location.href = '/';
                }
                return Promise.reject(error);
            }
        );
    }
    isAdmin() {
        const token = localStorage.getItem('token');
        if (!token) return false;

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            console.log('Payload do Token:', payload);
            return payload.isadmin === '1';
        } catch (error) {
            console.error('Erro ao decodificar token:', error);
            return false;
        }
    }
    async getUsers({ pageIndex, pageSize, name }) {
        const params = {
            pageIndex,
            pageSize,
        };
        if (name && name.trim()) {
            params.name = name.trim();
        }
        const response = await this.axios.get('', { params });
        return response.data;
    }

    async getUserById(id) {
        const response = await this.axios.get(`/${id}`);
        return response.data;
    }

    async updateUserStatus(id, active) {
        try {
            const response = await this.axios.patch(`/${id}/active`, active, {
                headers: { 'Content-Type': 'application/json' },
                transformRequest: [(data) => JSON.stringify(data)],
            });

            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                console.error(
                    'Erro ao atualizar status - Detalhes do erro:',
                    error.response.data
                );
            } else {
                console.error('Erro ao atualizar status:', error.message);
            }
            throw error;
        }
    }
}
