import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ExpenseTypeService from '../../Services/ExpenseTypeService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from '../../Components/Loading/index';

import {
    PageContainer,
    Button,
    CancelButton,
    FormCard,
    CreateExpenseTypeContainer,
    CreateExpenseTypeInput,
    Title,
} from './styles';

const expenseTypeService = new ExpenseTypeService();

const EditExpenseType = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [expenseType, setExpenseType] = useState({ name: '' });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchExpenseType = async () => {
            try {
                setIsLoading(true);
                const response = await expenseTypeService.getById(id);
                if (response && response.isSuccess && response.value) {
                    setExpenseType(response.value);
                } else {
                    toast.error('Erro ao buscar tipo de despesa');
                    navigate('/tipos-de-despesas');
                }
            } catch (error) {
                toast.error(`Erro ao conectar com a API: ${error.message}`);
                navigate('/tipos-de-despesas');
            } finally {
                setIsLoading(false);
            }
        };

        fetchExpenseType();
    }, [id, navigate]);

    const handleUpdate = async () => {
        if (!expenseType.name) {
            toast.error('O campo nome é obrigatório');
            return;
        }

        try {
            const response = await expenseTypeService.update(
                id,
                expenseType.name
            );

            if (response && response.isSuccess && response.value) {
                toast.success('Tipo de despesa atualizado com sucesso!');
                navigate('/tipos-de-despesas');
            } else {
                toast.error('Erro ao atualizar tipo de despesa');
            }
        } catch (error) {
            toast.error(`Erro ao conectar com a API: ${error.message}`);
        }
    };

    const handleChange = (event) => {
        setExpenseType({ ...expenseType, name: event.target.value });
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <PageContainer>
            <FormCard>
                <ToastContainer />
                <Title>Editar Tipo de Despesa</Title>
                <CreateExpenseTypeContainer>
                    <CreateExpenseTypeInput
                        name="name"
                        value={expenseType.name}
                        onChange={handleChange}
                        placeholder="Nome do Tipo de Despesa"
                    />
                    <Button onClick={handleUpdate}>Atualizar</Button>
                    <CancelButton
                        onClick={() => navigate('/tipos-de-despesas')}
                    >
                        Cancelar
                    </CancelButton>
                </CreateExpenseTypeContainer>
            </FormCard>
        </PageContainer>
    );
};

export default EditExpenseType;
