import axios from 'axios';

export default class ExpenseService {
    constructor() {
        this.axios = axios.create({
            baseURL: process.env.REACT_APP_API + '/api/Expense',
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
                if (error.response) {
                    console.log('Erro da API:', {
                        status: error.response.status,
                        data: error.response.data,
                        headers: error.response.headers,
                    });
                }

                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('token');
                    window.location.href = '/';
                }
                return Promise.reject(error);
            }
        );
    }

    async getAll(
        pageIndex = 0,
        pageSize = 10,
        startDate = '',
        endDate = '',
        description = '',
        name = ''
    ) {
        const { data } = await this.axios.get('', {
            params: {
                pageIndex,
                pageSize,
                startDate,
                endDate,
                description,
                name,
            },
        });
        if (data.isSuccess && data.value && data.value.items) {
            data.value.items = data.value.items.map((item) => ({
                ...item,
                expenseTypeDetails: {
                    id: item.expenseType,
                    name: item.expenseTypeName,
                },
            }));
        }

        return data;
    }
    async getById(id) {
        const { data } = await this.axios.get(`/${id}`);
        if (data.isSuccess && data.value) {
            data.value = {
                ...data.value,
                expenseTypeDetails: {
                    id: data.value.expenseType,
                    name: data.value.expenseTypeName,
                },
            };
        }

        return data;
    }

    async create(expense) {
        const formattedExpense = {
            description: expense.description,
            amount: parseFloat(expense.amount),
            releaseDate: new Date(expense.releaseDate).toISOString(),
            expenseType: expense.expenseType,
        };

        const { data } = await this.axios.post('', formattedExpense, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return data;
    }

    async update(id, expense) {
        const payload = {
            id: id,
            data: {
                description: expense.description,
                amount: expense.amount,
                releaseDate: expense.releaseDate,
                expenseType: expense.expenseType,
            },
        };

        const { data } = await this.axios.put(`/`, JSON.stringify(payload), {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return data;
    }

    async delete(id) {
        const { data } = await this.axios.delete(`/${id}`);
        return data;
    }
}
