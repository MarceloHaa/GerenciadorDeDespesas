import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import GraphicService from '../../Services/GraphicService';
import { DashboardContainer, ChartContainer, SelectMonth } from './styles';
import { useTheme } from '../../Contexts/ThemeContext';
const Colors = [
    '#281811',
    '#9b9552',
    '#d6ba98',
    '#a45758',
    '#808000',
    '#a76f54',
    '#a6aa3e',
    '#8e6695',
    '#44291d',
    '#b28767',
    '#7d4c4c',
    '#cd5c5c',
    '#b16b4a',
    '#99954b',
    '#cd5c5c',
    '#5b3727',
    '#a5a055',
    '#692f22',
    '#a17c6b',
    '#c4a17e',
    '#bdb76b',
    '#7b4230',
    '#8d5740',
    '#985c41',
    '#a06f53',
    '#331f15',
];
const GraphicPizza = () => {
    const { isDarkMode } = useTheme();
    const [pizzaData, setPizzaData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMonth, setSelectedMonth] = useState(() => {
        const currentDate = new Date();
        return `${currentDate.getFullYear()}-${String(
            currentDate.getMonth() + 1
        ).padStart(2, '0')}`;
    });

    const fetchPizzaData = async (yearMonth) => {
        const [year, month] = yearMonth.split('-');
        const startDate = `${year}-${month}-01`;
        const endDate = `${year}-${month}-${new Date(
            year,
            month,
            0
        ).getDate()}`;
        try {
            const data = await GraphicService.pizzaGraphic(startDate, endDate);
            setPizzaData(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchPizzaData(selectedMonth);
    }, [selectedMonth]);

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };
    return (
        <DashboardContainer $isDarkMode={isDarkMode}>
            <ChartContainer>
                <h2>Gráfico de Despesas - Mensal</h2>

                <SelectMonth value={selectedMonth} onChange={handleMonthChange}>
                    {Array.from({ length: 12 }).map((_, index) => {
                        const month = String(index + 1).padStart(2, '0');
                        const year = new Date().getFullYear();
                        return (
                            <option key={index} value={`${year}-${month}`}>
                                {`${month}/${year}`}
                            </option>
                        );
                    })}
                </SelectMonth>

                {loading ? (
                    <p>Carregando gráfico de pizza...</p>
                ) : (
                    <PieChart width={400} height={400}>
                        <Pie
                            data={pizzaData}
                            dataKey="total"
                            nameKey="type"
                            cx="50%"
                            cy="50%"
                            outerRadius={150}
                        >
                            {pizzaData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={Colors[index % Colors.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                )}
            </ChartContainer>
        </DashboardContainer>
    );
};

export default GraphicPizza;
