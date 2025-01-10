import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import { toast } from 'react-toastify';
import LoadingSpinner from '../../Components/Loading/index';

const EditExpense = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [expense, setExpense] = useState({
        description: '',
        amount: '0,00',
        expenseType: '',
        releaseDate: new Date().toISOString().split('T')[0],
    });
    const [expenseTypes, setExpenseTypes] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    const expenseService = useMemo(() => new ExpenseService(), []);
    const expenseTypeService = useMemo(() => new ExpenseTypeService(), []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const [expenseResponse, typesResponse] = await Promise.all([
                    expenseService.getById(id),
                    expenseTypeService.getAll(0, 100),
                ]);

                if (
                    typesResponse &&
                    typesResponse.isSuccess &&
                    typesResponse.value
                ) {
                    setExpenseTypes(typesResponse.value.items);

                    if (
                        expenseResponse &&
                        expenseResponse.isSuccess &&
                        expenseResponse.value
                    ) {
                        const expenseTypeId =
                            typesResponse.value.items.find(
                                (type) =>
                                    type.name ===
                                    expenseResponse.value.expenseType
                            )?.id || '';

                        setExpense({
                            ...expenseResponse.value,
                            amount: expenseResponse.value.amount
                                .toFixed(2)
                                .replace('.', ','),
                            releaseDate: new Date(
                                expenseResponse.value.releaseDate
                            )
                                .toISOString()
                                .split('T')[0],
                            expenseType: expenseTypeId.toString(),
                        });
                    } else {
                        toast.error('Erro ao buscar despesa');
                        navigate('/despesas');
                    }
                } else {
                    toast.error('Erro ao buscar tipos de despesas');
                }
            } catch (error) {
                console.error(`Erro ao conectar com a API: ${error}`);
                toast.error(`Erro ao conectar com a API: ${error.message}`);
                navigate('/');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id, navigate, expenseService, expenseTypeService]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'amount') {
            let formattedValue = value
                .replace(/\D/g, '')
                .replace(/(\d)(\d{2})$/, '$1,$2')
                .replace(/(?=(\d{3})+(\D))\B/g, '.');

            setExpense((prev) => ({
                ...prev,
                [name]: formattedValue,
            }));
        } else {
            setExpense((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleUpdate = async () => {
        try {
            setIsLoading(true);
            const selectedExpenseType = expenseTypes.find(
                (type) => type.id.toString() === expense.expenseType.toString()
            );

            const formattedExpense = {
                ...expense,
                amount: parseFloat(
                    expense.amount.replace('.', '').replace(',', '.')
                ),
                expenseType: selectedExpenseType
                    ? selectedExpenseType.name
                    : '',
            };

            const response = await expenseService.update(id, formattedExpense);
            if (response && response.isSuccess && response.value) {
                toast.success('Despesa atualizada com sucesso!');
                navigate('/despesas');
            } else {
                toast.error('Erro ao atualizar despesa');
            }
        } catch (error) {
            console.error(error);
            toast.error(`Erro ao conectar com a API: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <PageContainer>
            <FormCard>
                <Title>Editar Despesa</Title>

                <FormGroup>
                    <InputIcon>
                        <FileText size={20} />
                    </InputIcon>
                    <Input
                        name="description"
                        value={expense.description}
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
                        value={expense.amount}
                        onChange={handleChange}
                        onFocus={() => {
                            if (expense.amount === '0,00') {
                                setExpense((prev) => ({
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
                        value={expense.expenseType}
                        onChange={handleChange}
                    >
                        <option value="">Selecione o tipo de despesa</option>
                        {expenseTypes.map((type) => (
                            <option key={type.id} value={type.id}>
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
                        value={expense.releaseDate}
                        onChange={handleChange}
                    />
                </FormGroup>

                <ButtonGroup stacked>
                    <Button onClick={handleUpdate}>Atualizar</Button>
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

export default EditExpense;
