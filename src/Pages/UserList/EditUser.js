import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Title,
    InputField,
    Button,
    PageContainer,
    FormCard,
    ContainerEdit,
} from './styles';
import UserAdmin from '../../Services/UserAdmin';
import ToggleButton from './ToggleButton';
import LoadingSpinner from '../../Components/Loading/index';

const userAdmin = new UserAdmin();

const EditUser = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { userId } = useParams();
    const navigate = useNavigate();
    const [invoiceDay, setInvoiceDay] = useState('');
    const [active, setActive] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const fetchUserDetails = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await userAdmin.getUserById(userId);

            if (response.isSuccess && response.value) {
                const user = response.value;
                setInvoiceDay(user.invoiceDay ? String(user.invoiceDay) : '');
                setActive(user.active ?? false);
            } else {
                console.error(
                    'Erro ao buscar detalhes do usuário:',
                    response.error
                );
            }
        } catch (error) {
            console.error('Erro ao buscar detalhes do usuário:', error);
        } finally {
            setIsLoading(false);
        }
    }, [userId]);

    const handleUpdateUser = async () => {
        if (isUpdating) return;

        setIsUpdating(true);
        try {
            await userAdmin.updateUser(
                userId,
                active,
                parseInt(invoiceDay, 10)
            );
            navigate('/usuarios');
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error.message);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleToggleStatus = () => {
        setActive((prev) => !prev);
    };

    const handleCancel = () => {
        navigate('/usuarios');
    };

    useEffect(() => {
        fetchUserDetails();
    }, [fetchUserDetails]);

    if (isLoading) return <LoadingSpinner />;

    return (
        <PageContainer>
            <Title>Editar Usuário</Title>
            <FormCard>
                <ContainerEdit>
                    <label htmlFor="invoiceDay">Dia de Vencimento:</label>
                    <InputField
                        id="invoiceDay"
                        type="number"
                        min="1"
                        max="31"
                        placeholder="Dia de vencimento"
                        value={invoiceDay}
                        onChange={(e) => setInvoiceDay(e.target.value)}
                    />
                    <label>Status:</label>
                    <ToggleButton
                        isActive={active}
                        onToggle={handleToggleStatus}
                        disabled={isUpdating}
                    />
                    <Button onClick={handleUpdateUser}>Salvar</Button>
                    <Button onClick={handleCancel}>Cancelar</Button>
                </ContainerEdit>
            </FormCard>
        </PageContainer>
    );
};

export default EditUser;
