import React, { useEffect, useState } from 'react';
import UserAdmin from '../../Services/UserAdmin';
import {
    Container,
    Table,
    Button,
    Pagination,
    Title,
    SearchInput,
    FilterContainer,
} from './styles';
import LoadingSpinner from '../../Components/Loading';
import { useTheme } from '../../Contexts/ThemeContext';

const userAdmin = new UserAdmin();

const UserList = () => {
    const { isDarkMode } = useTheme();
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [filterText, setFilterText] = useState('');
    const [debouncedFilterText, setDebouncedFilterText] = useState('');

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedFilterText(filterText);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [filterText]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setIsLoading(true);
                const response = await userAdmin.getUsers({
                    pageIndex,
                    pageSize,
                    name: debouncedFilterText,
                });
                setUsers(response.value.items);
                setTotalPages(response.value.totalPages);
            } catch (error) {
                console.error('Error ao buscar users:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, [pageIndex, pageSize, debouncedFilterText]);

    const handleStatusChange = async (id, currentActive) => {
        const newStatus = !currentActive;

        try {
            await userAdmin.updateUserStatus(id, newStatus);
            const fetchUsers = async () => {
                try {
                    setIsLoading(true);
                    const response = await userAdmin.getUsers({
                        pageIndex,
                        pageSize,
                        name: debouncedFilterText,
                    });
                    setUsers(response.value.items);
                    setTotalPages(response.value.totalPages);
                } catch (error) {
                    console.error('Error ao buscar users:', error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchUsers();
        } catch (error) {
            console.error('Erro ao modificar status:', error);
        }
    };

    const handleFilterClick = () => {
        setPageIndex(0);
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <Container $isDarkMode={isDarkMode}>
            <Title>Lista de Usuários</Title>
            <FilterContainer>
                <SearchInput
                    type="text"
                    placeholder="Filtrar por nome"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                />
                <Button onClick={handleFilterClick}>Filtrar</Button>
            </FilterContainer>
            <Table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.active ? 'Ativo' : 'Inativo'}</td>
                            <td style={{ textAlign: 'center' }}>
                                <Button
                                    onClick={() =>
                                        handleStatusChange(user.id, user.active)
                                    }
                                    isActive={user.active}
                                >
                                    {user.active ? 'Desativar' : 'Ativar'}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination>
                <Button
                    onClick={() => setPageIndex(Math.max(0, pageIndex - 1))}
                    disabled={pageIndex === 0}
                >
                    Anterior
                </Button>
                <span>
                    Página {pageIndex + 1} de {totalPages}
                </span>
                <Button
                    onClick={() =>
                        setPageIndex(Math.min(totalPages - 1, pageIndex + 1))
                    }
                    disabled={pageIndex === totalPages - 1}
                >
                    Próxima
                </Button>
            </Pagination>
        </Container>
    );
};

export default UserList;
