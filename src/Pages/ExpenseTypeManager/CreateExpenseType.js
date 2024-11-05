import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExpenseTypeService from '../../Services/ExpenseTypeService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    PageContainer,
    Button,
    CancelButton,
    Container,
    FormCard,
    CreateExpenseTypeContainer,
    CreateExpenseTypeInput,
    Title,
} from './styles';

const expenseTypeService = new ExpenseTypeService();

const CreateExpenseType = () => {
    const navigate = useNavigate();
    const [newExpenseType, setNewExpenseType] = useState({ name: '' });

    const handleCreate = async () => {
        if (!newExpenseType.name) {
            toast.error('O campo nome é obrigatório');
            return;
        }

        try {
            const response = await expenseTypeService.create(
                newExpenseType.name
            );

            if (response && response.isSuccess && response.value) {
                toast.success('Tipo de despesa criado com sucesso!');
                navigate('/tipos-de-despesas');
            } else {
                toast.error('Erro ao criar tipo de despesa');
            }
        } catch (error) {
            toast.error(`Erro ao conectar com a API: ${error.message}`);
        }
    };

    const handleChange = (event) => {
        setNewExpenseType({ name: event.target.value });
    };

    return (
        <PageContainer>
            <FormCard>
                <Container>
                    <ToastContainer />
                    <Title>Criar Novo Tipo de Despesa</Title>
                    <CreateExpenseTypeContainer>
                        <CreateExpenseTypeInput
                            name="name"
                            value={newExpenseType.name}
                            onChange={handleChange}
                            placeholder="Nome do Tipo de Despesa"
                        />
                        <Button onClick={handleCreate}>Criar</Button>
                        <CancelButton
                            onClick={() => navigate('/tipos-de-despesas')}
                        >
                            Cancelar
                        </CancelButton>
                    </CreateExpenseTypeContainer>
                </Container>
            </FormCard>
        </PageContainer>
    );
};

export default CreateExpenseType;
