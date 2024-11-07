import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ExpenseService from '../../Services/ExpenseService';
import ExpenseTypeService from '../../Services/ExpenseTypeService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from '../../Components/Loading/index';
import { Pencil, Trash2 } from 'lucide-react';
import { useTheme } from '../../Contexts/ThemeContext';

import {
    Container,
    Title,
    ExpenseTable,
    TableHeader,
    TableRow,
    TableCell,
    Button,
    ActionIcon,
    PaginationContainer,
    FilterContainer,
    FilterInput,
    FilterButton,
} from './styles';

const expenseService = new ExpenseService();
const expenseTypeService = new ExpenseTypeService();

const ExpenseManager = () => {
    const { isDarkMode } = useTheme();
    const [expenses, setExpenses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expenseTypeMap, setExpenseTypeMap] = useState({});
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
        totalCount: 0,
        totalPages: 0,
        hasPreviousPage: false,
        hasNextPage: false,
    });
    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        description: '',
        name: '',
    });

    const navigate = useNavigate();

    const fetchExpenses = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await expenseService.getAll(
                pagination.pageIndex,
                pagination.pageSize,
                filters.startDate,
                filters.endDate,
                filters.description,
                filters.name
            );
            if (response && response.isSuccess && response.value) {
                setExpenses(response.value.items);
                setPagination({
                    pageIndex: response.value.pageIndex,
                    pageSize: response.value.pageSize,
                    totalCount: response.value.totalCount,
                    totalPages: response.value.totalPages,
                    hasPreviousPage: response.value.hasPreviousPage,
                    hasNextPage: response.value.hasNextPage,
                });
            } else {
                setError('Erro ao buscar despesas');
                toast.error('Erro ao buscar despesas');
            }
        } catch (error) {
            setError(`Erro ao conectar com a API: ${error.message}`);
            toast.error(`Erro ao conectar com a API: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    }, [pagination.pageIndex, pagination.pageSize, filters]);

    const fetchExpenseTypes = useCallback(async () => {
        try {
            const response = await expenseTypeService.getAll();
            if (response && response.isSuccess && response.value) {
                const typesMap = response.value.items.reduce((map, type) => {
                    map[type.id] = type.name;
                    return map;
                }, {});
                setExpenseTypeMap(typesMap);
            }
        } catch (error) {
            console.error('Erro ao carregar tipos de despesas:', error);
        }
    }, []);

    useEffect(() => {
        fetchExpenses();
        fetchExpenseTypes();
    }, [fetchExpenses, fetchExpenseTypes]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        fetchExpenses();
    };

    const handleDelete = async (id) => {
        try {
            setIsLoading(true);
            const response = await expenseService.delete(id);
            if (response && response.isSuccess) {
                toast.success('Despesa excluída com sucesso!');
                fetchExpenses();
            } else {
                setError('Erro ao deletar despesa');
                toast.error('Erro ao deletar despesa');
            }
        } catch (error) {
            setError('Erro ao conectar com a API');
            toast.error('Erro ao conectar com a API');
        } finally {
            setIsLoading(false);
        }
    };

    const handlePageChange = (newPageIndex) => {
        setPagination((prev) => ({ ...prev, pageIndex: newPageIndex }));
        setIsLoading(true);
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    if (isLoading) return <LoadingSpinner />;
    if (error) return <div>Erro: {error}</div>;

    return (
        <Container $isDarkMode={isDarkMode}>
            <ToastContainer />
            <Title>Gerenciar Despesas</Title>

            <FilterContainer>
                <form onSubmit={handleFilterSubmit}>
                    <FilterInput
                        type="date"
                        name="startDate"
                        value={filters.startDate}
                        onChange={handleFilterChange}
                        placeholder="Data Inicial"
                    />
                    <FilterInput
                        type="date"
                        name="endDate"
                        value={filters.endDate}
                        onChange={handleFilterChange}
                        placeholder="Data Final"
                    />
                    <FilterInput
                        type="text"
                        name="description"
                        value={filters.description}
                        onChange={handleFilterChange}
                        placeholder="Descrição"
                    />
                    <FilterInput
                        type="text"
                        name="name"
                        value={filters.name}
                        onChange={handleFilterChange}
                        placeholder="Nome"
                    />

                    <FilterButton type="button" onClick={handleGoBack}>
                        Voltar
                    </FilterButton>
                    <FilterButton type="submit">Filtrar</FilterButton>
                    <Button onClick={() => navigate('/despesas/criar')}>
                        Criar Nova Despesa
                    </Button>
                </form>
            </FilterContainer>

            {Array.isArray(expenses) && expenses.length > 0 ? (
                <>
                    <ExpenseTable>
                        <thead>
                            <TableRow>
                                <TableHeader>Descrição</TableHeader>
                                <TableHeader>Valor</TableHeader>
                                <TableHeader>Tipo</TableHeader>
                                <TableHeader>Data</TableHeader>
                                <TableHeader>Ações</TableHeader>
                            </TableRow>
                        </thead>
                        <tbody>
                            {expenses.map((expense) => (
                                <TableRow key={expense.id}>
                                    <TableCell>{expense.description}</TableCell>
                                    <TableCell>
                                        R$ {expense.amount.toFixed(2)}
                                    </TableCell>
                                    <TableCell>
                                        {expenseTypeMap[expense.expenseType] ||
                                            expense.expenseType}
                                    </TableCell>
                                    <TableCell>
                                        {(() => {
                                            const localDate = new Date(
                                                expense.releaseDate
                                            );
                                            const adjustedDate = new Date(
                                                localDate.getTime() +
                                                    localDate.getTimezoneOffset() *
                                                        60000
                                            );
                                            return adjustedDate.toLocaleDateString(
                                                'pt-BR',
                                                {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric',
                                                }
                                            );
                                        })()}
                                    </TableCell>
                                    <TableCell>
                                        <ActionIcon
                                            onClick={() => {
                                                navigate(
                                                    `/despesas/editar/${expense.id}`
                                                );
                                            }}
                                        >
                                            <Pencil size={18} />
                                        </ActionIcon>
                                        <ActionIcon
                                            onClick={() =>
                                                handleDelete(expense.id)
                                            }
                                        >
                                            <Trash2 size={18} />
                                        </ActionIcon>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </tbody>
                    </ExpenseTable>
                    <PaginationContainer>
                        <Button
                            onClick={() =>
                                handlePageChange(pagination.pageIndex - 1)
                            }
                            disabled={!pagination.hasPreviousPage}
                        >
                            Anterior
                        </Button>
                        <span>
                            Página {pagination.pageIndex + 1} de{' '}
                            {pagination.totalPages}
                        </span>
                        <Button
                            onClick={() =>
                                handlePageChange(pagination.pageIndex + 1)
                            }
                            disabled={!pagination.hasNextPage}
                        >
                            Próxima
                        </Button>
                    </PaginationContainer>
                </>
            ) : (
                <div>
                    <p>Nenhuma despesa encontrada.</p>
                </div>
            )}
        </Container>
    );
};

export default ExpenseManager;
