import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ExpenseService from '../../Services/ExpenseService';
import ExpenseTypeService from '../../Services/ExpenseTypeService';
import { Calendar, DollarSign, FileText, Tag } from 'lucide-react';
import {
    PageContainer,
    FormCard,
    Title,
    FormGroup,
    InputIcon,
    Input,
    Select,
    ButtonGroup,
    Button,
} from './styles';
import LoadingSpinner from '../../Components/Loading';

const CreateExpense = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [newExpense, setNewExpense] = useState({
        description: '',
        amount: '0.00',
        expenseType: '',
        releaseDate: new Date().toISOString().split('T')[0],
    });
    const [expenseTypes, setExpenseTypes] = useState([]);
    const navigate = useNavigate();

    const expenseService = useMemo(() => new ExpenseService(), []);
    const expenseTypeService = useMemo(() => new ExpenseTypeService(), []);

    useEffect(() => {
        const fetchExpenseTypes = async () => {
            try {
                setIsLoading(true);
                const response = await expenseTypeService.getAll(0, 100);
                if (response && response.isSuccess && response.value) {
                    setExpenseTypes(response.value.items);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchExpenseTypes();
    }, [expenseTypeService]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'amount') {
            let formattedValue = value
                .replace(/\D/g, '')
                .replace(/(\d)(\d{2})$/, '$1,$2')
                .replace(/(?=(\d{3})+(\D))\B/g, '.');

            setNewExpense((prev) => ({
                ...prev,
                [name]: formattedValue,
            }));
        } else {
            setNewExpense((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleCreate = async () => {
        try {
            setIsLoading(true);
            const selectedExpenseType = expenseTypes.find(
                (type) => type.id.toString() === newExpense.expenseType
            );
            const formattedExpense = {
                description: newExpense.description,
                amount: newExpense.amount
                    ? parseFloat(newExpense.amount.replace(',', '.'))
                    : 0.0,
                releaseDate: new Date(newExpense.releaseDate).toISOString(),
                expenseType: selectedExpenseType
                    ? selectedExpenseType.name
                    : '',
            };

            const response = await expenseService.create(formattedExpense);
            if (response && response.isSuccess && response.value) {
                navigate('/despesas');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };
    if (isLoading) return <LoadingSpinner />;

    return (
        <PageContainer>
            <FormCard>
                <Title>Nova Despesa</Title>

                <FormGroup>
                    <InputIcon>
                        <FileText size={20} />
                    </InputIcon>
                    <Input
                        name="description"
                        value={newExpense.description}
                        onChange={handleChange}
                        placeholder="Descrição da despesa"
                    />
                </FormGroup>

                <FormGroup>
                    <InputIcon>
                        <DollarSign size={20} />
                    </InputIcon>
                    <Input
                        type="text"
                        name="amount"
                        value={newExpense.amount}
                        onChange={handleChange}
                        onFocus={() => {
                            if (newExpense.amount === '0.00') {
                                setNewExpense((prev) => ({
                                    ...prev,
                                    amount: '',
                                }));
                            }
                        }}
                        placeholder="Valor"
                    />
                </FormGroup>

                <FormGroup>
                    <InputIcon>
                        <Tag size={20} />
                    </InputIcon>
                    <Select
                        name="expenseType"
                        value={newExpense.expenseType}
                        onChange={handleChange}
                    >
                        <option value="">Selecione o tipo de despesa</option>
                        {expenseTypes.map((type) => (
                            <option key={type.id} value={type.id.toString()}>
                                {type.name}
                            </option>
                        ))}
                    </Select>
                </FormGroup>

                <FormGroup>
                    <InputIcon>
                        <Calendar size={20} />
                    </InputIcon>
                    <Input
                        type="date"
                        name="releaseDate"
                        value={newExpense.releaseDate}
                        onChange={handleChange}
                    />
                </FormGroup>

                <ButtonGroup stacked>
                    <Button onClick={handleCreate}>Criar Despesa</Button>
                    <Button
                        variant="danger"
                        onClick={() => navigate('/despesas')}
                    >
                        Cancelar
                    </Button>
                </ButtonGroup>
            </FormCard>
        </PageContainer>
    );
};

export default CreateExpense;
