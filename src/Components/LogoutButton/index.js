import React, { useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { ButtonLogaut, Tooltip } from './styles';
import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ $isExpanded }) => {
    const navigate = useNavigate();
    const [hover, setHover] = useState(false);

    const handleLogout = async () => {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            navigate('/login');
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    return (
        <ButtonLogaut
            onClick={handleLogout}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <FiLogOut size={25} />
            {$isExpanded && <span>Sair</span>}
        </ButtonLogaut>
    );
};

export default LogoutButton;
