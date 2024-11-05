import axios from 'axios';

export default class ExpenseTypeService {
    constructor() {
        this.axios = axios.create({
            baseURL: process.env.REACT_APP_API + '/api/ExpenseType',
        });
        this.axios.interceptors.request.use((config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
    }

    async getAll(pageIndex = 0, pageSize = 10) {
        const { data } = await this.axios.get('', {
            params: { pageIndex, pageSize },
        });
        return data;
    }

    async getById(id) {
        const { data } = await this.axios.get(`/${id}`);
        return data;
    }

    async create(name) {
        const { data } = await this.axios.post('', name, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return data;
    }

    async update(id, newName) {
        const { data } = await this.axios.put(
            `/${id}`,
            JSON.stringify(newName),
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return data;
    }

    async delete(id) {
        const { data } = await this.axios.delete(`/${id}`);
        return data;
    }
}
