import React, { useEffect, useState } from 'react';
import { Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import GraphicService from '../../Services/GraphicService';
import {
    DashboardContainer,
    ChartContainer,
    ChartContent,
    ChartScrollContainer,
    SelectContainer,
    TotalContainer,
    SelectMonth,
} from './styles';
import { useTheme } from '../../Contexts/ThemeContext';

const Colors = [
    '#331f15',
    '#44291d',
    '#5b3727',
    '#692f22',
    '#7b4230',
    '#8d5740',
    '#985c41',
    '#a06f53',
    '#b28767',
    '#ca9984',
    '#c4a17e',
    '#d1a895',
    '#d6ba98',
];

const monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
];

const GraphicBar = () => {
    const { isDarkMode } = useTheme();
    const [barData, setBarData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [totalMensal, setTotalMensal] = useState(0);

    const calculateChartWidth = (data) => {
        const minWidthPerBar = 40;
        return Math.max(600, Math.min(data.length * minWidthPerBar, 1500));
    };

    const fetchBarData = async (selectedMonth, selectedYear) => {
        try {
            const data = await GraphicService.barGraphic(
                selectedMonth,
                selectedYear
            );

            const totalMensal = data.reduce((acc, curr) => acc + curr.total, 0);
            setTotalMensal(totalMensal);

            const formattedData = data.map((item) => ({
                day: `Dia ${item.day}`,
                total: item.total,
            }));

            setBarData(formattedData);
            setError(null);
        } catch (error) {
            console.error('Erro ao buscar dados do gráfico:', error);
            setError('Erro ao carregar os dados do gráfico.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBarData(month, year);
    }, [month, year]);

    const handleMonthChange = (e) => setMonth(Number(e.target.value));
    const handleYearChange = (e) => setYear(Number(e.target.value));

    return (
        <DashboardContainer $isDarkMode={isDarkMode}>
            <ChartContainer>
                <h2>
                    Gráfico de Despesas Diárias - {monthNames[month - 1]} {year}
                </h2>

                <SelectContainer>
                    <label htmlFor="month-select">Mês:</label>
                    <SelectMonth
                        id="month-select"
                        value={month}
                        onChange={handleMonthChange}
                    >
                        {monthNames.map((name, index) => (
                            <option key={index} value={index + 1}>
                                {name}
                            </option>
                        ))}
                    </SelectMonth>

                    <label htmlFor="year-select">Ano:</label>
                    <SelectMonth
                        id="year-select"
                        value={year}
                        onChange={handleYearChange}
                    >
                        {Array.from({ length: 10 }, (_, i) => year - i).map(
                            (yearOption) => (
                                <option key={yearOption} value={yearOption}>
                                    {yearOption}
                                </option>
                            )
                        )}
                    </SelectMonth>
                </SelectContainer>
                <ChartContent>
                    {loading ? (
                        <p>Carregando gráfico de barra...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <>
                            <TotalContainer>
                                <strong>
                                    Total gasto no mês: R${' '}
                                    {totalMensal.toFixed(2)}
                                </strong>
                            </TotalContainer>
                            <ChartScrollContainer>
                                <BarChart
                                    width={calculateChartWidth(barData)}
                                    height={300}
                                    data={barData}
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <XAxis
                                        dataKey="day"
                                        tickFormatter={(value = '') => value}
                                    />
                                    <YAxis
                                        dataKey="total"
                                        orientation="left"
                                        allowDecimals={false}
                                        tickFormatter={(value = 0) =>
                                            `R$ ${value}`
                                        }
                                    />
                                    <Tooltip
                                        formatter={(value) => [
                                            `R$ ${value}`,
                                            'Total',
                                        ]}
                                    />
                                    <Legend />
                                    <Bar dataKey="total">
                                        {barData.map((entry, index) => (
                                            <Cell
                                                key={`cell-bar-${index}`}
                                                fill={
                                                    Colors[
                                                        index % Colors.length
                                                    ]
                                                }
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ChartScrollContainer>
                        </>
                    )}
                </ChartContent>
            </ChartContainer>
        </DashboardContainer>
    );
};

export default GraphicBar;
