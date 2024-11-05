import axios from 'axios';

class GraphicService {
    constructor() {
        this.axios = axios.create({
            baseURL: process.env.REACT_APP_API + '/api/Home',
        });
        this.axios.interceptors.request.use((config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
    }

    async pizzaGraphic(startDate, endDate) {
        const { data } = await this.axios.get('/PizzaGraphic', {
            params: { startDate, endDate },
        });

        if (data.isSuccess) {
            return data.value;
        } else {
            console.error(
                'Erro ao buscar os dados do gráfico de pizza:',
                data.error
            );
            return [];
        }
    }

    async barGraphic(month, year) {
        const { data } = await this.axios.get('/BarGraphic', {
            params: { month, year },
        });

        if (data.isSuccess) {
            return data.value;
        } else {
            console.error(
                'Erro ao buscar os dados do gráfico de barras:',
                data.error
            );
            return [];
        }
    }
}

const graphicServiceInstance = new GraphicService();
export default graphicServiceInstance;
