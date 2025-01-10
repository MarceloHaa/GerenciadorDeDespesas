import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import GraphicService from '../../Services/GraphicService';
import UserServices from '../../Services/UserService';
import 'react-datepicker/dist/react-datepicker.css';
import {
    DashboardContainer,
    ChartContainer,
    FilterContainer,
    ToggleButton,
    FilterButton,
    RangeFilter,
    PickerContainer,
    TypeInput,
    StyledDatePicker,
    StyledSelect,
    StyledLabel,
} from './styles';
import { useTheme } from '../../Contexts/ThemeContext';

const Colors = [
    '#5c0a0a',
    '#691717',
    '#430f0f',
    '#831d1c',
    '#382821',
    '#49372b',
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
    const userServices = useMemo(() => new UserServices(), []);
    const { isDarkMode } = useTheme();
    const [pizzaData, setPizzaData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDateRange, setShowDateRange] = useState(false);
    const [invoiceDay, setInvoiceDay] = useState('');
    const [invoiceMonth, setInvoiceMonth] = useState(new Date().getMonth() + 1);
    const [dateRange, setDateRange] = useState({
        startDate: null,
        endDate: null,
    });

    const fetchPizzaData = useCallback(
        async (useCurrentsDates = true) => {
            setLoading(true);
            try {
                let data = [];

                if (!showDateRange || useCurrentsDates) {
                    const year = new Date().getFullYear();
                    const startDateStr = `${year}-${String(
                        invoiceMonth
                    ).padStart(2, '0')}-01`;
                    const lastDay = new Date(year, invoiceMonth, 0).getDate();
                    const endDateStr = `${year}-${String(invoiceMonth).padStart(
                        2,
                        '0'
                    )}-${lastDay}`;
                    data = await GraphicService.pizzaGraphic(
                        startDateStr,
                        endDateStr,
                        invoiceDay,
                        invoiceMonth
                    );
                } else if (dateRange.startDate && dateRange.endDate) {
                    const startMonth = dateRange.startDate.getMonth() + 1;
                    const formatDate = (date) => {
                        return date.toISOString().split('T')[0];
                    };
                    data = await GraphicService.pizzaGraphic(
                        formatDate(dateRange.startDate),
                        formatDate(dateRange.endDate),
                        null,
                        startMonth
                    );
                }
                setPizzaData(data);
            } catch (error) {
                console.error(
                    'Erro ao buscar dados:',
                    error.response?.data || error
                );
            } finally {
                setLoading(false);
            }
        },
        [showDateRange, dateRange, invoiceDay, invoiceMonth]
    );

    useEffect(() => {
        const fetchedInvoiceDay = userServices.getInvoiceDay();
        if (fetchedInvoiceDay) {
            setInvoiceDay(fetchedInvoiceDay);
        }
    }, [userServices]);

    useEffect(() => {
        if (!showDateRange) {
            fetchPizzaData();
        }
    }, [fetchPizzaData, invoiceDay, invoiceMonth, showDateRange]);

    const handleInvoiceDayChange = (event) => {
        const day = event.target.value;
        if (day >= 1 && day <= 31) setInvoiceDay(day);
    };

    const handleInvoiceMonthChange = (event) => {
        setInvoiceMonth(Number(event.target.value));
    };

    const toggleDateRange = () => {
        setShowDateRange(!showDateRange);
        if (!showDateRange) {
            setDateRange({ startDate: null, endDate: null });
        } else {
            fetchPizzaData(true);
        }
    };
    const handleFilterClick = () => {
        if (showDateRange && dateRange.startDate && dateRange.endDate) {
            fetchPizzaData(false);
        }
    };
<<<<<<< HEAD:src/Components/Graficos/GraphicPizza.js

    const isFilterEnabled =
        showDateRange && dateRange.startDate && dateRange.endDate;

=======
    const renderLegend = (props) => {
        const { payload } = props;
        return (
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '10px',
                    maxWidth: '100%',
                }}
            >
                {payload.map((entry, index) => (
                    <div
                        key={`legend-${index}`}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginRight: '10px',
                            fontSize: '12px',
                        }}
                    >
                        <div
                            style={{
                                width: '10px',
                                height: '10px',
                                backgroundColor: entry.color,
                                marginRight: '5px',
                            }}
                        />
                        <span>{entry.value}</span>
                    </div>
                ))}
            </div>
        );
    };
>>>>>>> 26467702075bbb4e129d60e193fa60c0f0a598c4:src/Components/Graphic/GraphicPizza.js
    return (
        <DashboardContainer $isDarkMode={isDarkMode}>
            <ChartContainer>
                <h2>Gráfico de Despesas</h2>
                <FilterContainer>
                    <ToggleButton onClick={toggleDateRange}>
                        {showDateRange
                            ? 'Usar Dia da Fatura'
                            : 'Filtrar por Data'}
                    </ToggleButton>

                    {!showDateRange ? (
                        <RangeFilter>
                            <StyledLabel>
                                Dia da Fatura:
                                <TypeInput
                                    type="number"
                                    value={invoiceDay}
                                    onChange={handleInvoiceDayChange}
                                    min="1"
                                    max="31"
                                />
                            </StyledLabel>
                            <StyledLabel>
                                Mês:
                                <StyledSelect
                                    value={invoiceMonth}
                                    onChange={handleInvoiceMonthChange}
                                >
                                    {Array.from({ length: 12 }, (_, i) => {
                                        const month = new Date(
                                            0,
                                            i
                                        ).toLocaleString('pt-BR', {
                                            month: 'long',
                                        });
                                        const capitalizedMonth =
                                            month.charAt(0).toUpperCase() +
                                            month.slice(1);

                                        return (
                                            <option key={i + 1} value={i + 1}>
                                                {capitalizedMonth}
                                            </option>
                                        );
                                    })}
                                </StyledSelect>
                            </StyledLabel>
                        </RangeFilter>
                    ) : (
                        <RangeFilter>
                            <PickerContainer>
                                <label>Data Inicial:</label>
                                <StyledDatePicker
                                    selected={dateRange.startDate}
                                    onChange={(date) =>
                                        setDateRange((prev) => ({
                                            ...prev,
                                            startDate: date,
                                        }))
                                    }
                                    selectsStart
                                    startDate={dateRange.startDate}
                                    endDate={dateRange.endDate}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Selecione a data inicial"
                                />
                            </PickerContainer>
                            <PickerContainer>
                                <label>Data Final:</label>
                                <StyledDatePicker
                                    selected={dateRange.endDate}
                                    onChange={(date) =>
                                        setDateRange((prev) => ({
                                            ...prev,
                                            endDate: date,
                                        }))
                                    }
                                    selectsEnd
                                    startDate={dateRange.startDate}
                                    endDate={dateRange.endDate}
                                    minDate={dateRange.startDate}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Selecione a data final"
                                />
                            </PickerContainer>

                            <FilterButton
                                onClick={handleFilterClick}
                                disabled={!isFilterEnabled}
                            >
                                Buscar
                            </FilterButton>
                        </RangeFilter>
                    )}
                </FilterContainer>

                {loading ? (
                    <p>Carregando gráfico de pizza...</p>
                ) : (
                    <PieChart
                        width={400}
                        height={600}
                        margin={{ top: 0, right: 0, bottom: 50, left: 0 }}
                    >
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
                        <Legend
                            content={renderLegend}
                            verticalAlign="bottom"
                            align="center"
                            wrapperStyle={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                            }}
                        />
                    </PieChart>
                )}
            </ChartContainer>
        </DashboardContainer>
    );
};

export default GraphicPizza;
