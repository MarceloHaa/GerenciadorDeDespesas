import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ExpenseTypeService from '../../Services/ExpenseTypeService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from '../../Components/Loading/index';
import { Pencil, Trash2 } from 'lucide-react';
import { useTheme } from '../../Contexts/ThemeContext';

import {
    Button,
    ButtonGroup,
    PageContainer,
    Container,
    DeleteButton,
    ExpenseTypeItem,
    ExpenseTypeList,
    PaginationContainer,
    Title,
} from './styles';

const expenseTypeService = new ExpenseTypeService();

const ExpenseTypeManager = () => {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();
    const [expenseTypes, setExpenseTypes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
        totalCount: 0,
        totalPages: 0,
        hasPreviousPage: false,
        hasNextPage: false,
    });

    const fetchExpenseTypes = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await expenseTypeService.getAll(
                pagination.pageIndex,
                pagination.pageSize
            );
            if (response && response.isSuccess && response.value) {
                setExpenseTypes(response.value.items);
                setPagination({
                    pageIndex: response.value.pageIndex,
                    pageSize: response.value.pageSize,
                    totalCount: response.value.totalCount,
                    totalPages: response.value.totalPages,
                    hasPreviousPage: response.value.hasPreviousPage,
                    hasNextPage: response.value.hasNextPage,
                });
            } else {
                setError('Erro ao buscar tipos de despesas');
                toast.error('Erro ao buscar tipos de despesas');
            }
        } catch (error) {
            setError(`Erro ao conectar com a API: ${error.message}`);
            toast.error(`Erro ao conectar com a API: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    }, [pagination.pageIndex, pagination.pageSize]);

    useEffect(() => {
        fetchExpenseTypes();
    }, [fetchExpenseTypes]);

    const handleDelete = async (id) => {
        try {
            setIsLoading(true);
            const response = await expenseTypeService.delete(id);
            if (response && response.isSuccess) {
                toast.success('Tipo de despesa excluído com sucesso!');
                fetchExpenseTypes();
            } else {
                setError('Erro ao deletar tipo de despesa');
                toast.error('Erro ao deletar tipo de despesa');
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
    };

    const handleEdit = (id) => {
        navigate(`/tipos-de-despesas/editar/${id}`);
    };

    if (isLoading) return <LoadingSpinner />;
    if (error) return <div>Erro: {error}</div>;

    return (
        <PageContainer $isDarkMode={isDarkMode}>
            <Container>
                <ToastContainer />
                <Title>Gerenciar Tipos de Despesas</Title>

                <Button onClick={() => navigate('/tipos-de-despesas/criar')}>
                    Criar Novo Tipo de Despesa
                </Button>

                {Array.isArray(expenseTypes) && expenseTypes.length > 0 ? (
                    <>
                        <ExpenseTypeList>
                            {expenseTypes.map((expenseType) => (
                                <ExpenseTypeItem key={expenseType.id}>
                                    <span>{expenseType.name}</span>
                                    <ButtonGroup>
                                        <Button
                                            onClick={() =>
                                                handleEdit(expenseType.id)
                                            }
                                        >
                                            <Pencil size={18} />
                                        </Button>
                                        <DeleteButton
                                            onClick={() =>
                                                handleDelete(expenseType.id)
                                            }
                                        >
                                            <Trash2 size={18} />
                                        </DeleteButton>
                                    </ButtonGroup>
                                </ExpenseTypeItem>
                            ))}
                        </ExpenseTypeList>
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
                        <p>Nenhum tipo de despesa encontrado.</p>
                    </div>
                )}
            </Container>
        </PageContainer>
    );
};

export default ExpenseTypeManager;
