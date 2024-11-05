import React, { useState, useEffect, useMemo } from 'react';
import { Home, Receipt, List, LogOut, Sun, Moon, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import UserServices from '../../Services/UserService';
import { useTheme } from '../../Contexts/ThemeContext';

import {
    SidebarContainer,
    LogoImage,
    NavItems,
    NavItem,
    StyledNavLink,
    LogoutButton,
    ThemeToggleButton,
    WelcomeMessage,
    FooterContainer,
    MobileOverlay,
    MenuButton,
} from './styles';
import logoImage from '../../img/logo.png';

const Sidebar = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const userService = useMemo(() => new UserServices(), []);
    const isAdmin = userService.isAdmin();
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth > 768) {
                setIsExpanded(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const name = userService.getUserName();
        setUserName(name);
    }, [userService]);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    const handleLogout = async () => {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            navigate('/');
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    return (
        <>
            {isMobile && (
                <MenuButton onClick={toggleSidebar} $isExpanded={isExpanded}>
                    <Menu size={24} />
                </MenuButton>
            )}

            {isMobile && isExpanded && (
                <MobileOverlay onClick={() => setIsExpanded(false)} />
            )}
            <SidebarContainer
                $isExpanded={isExpanded}
                $isDarkMode={isDarkMode}
                $isMobile={isMobile}
                onMouseEnter={() => !isMobile && setIsExpanded(true)}
                onMouseLeave={() => !isMobile && setIsExpanded(false)}
            >
                <LogoImage
                    src={logoImage}
                    alt="Logo"
                    $isExpanded={isExpanded}
                />

                {userName && (
                    <WelcomeMessage $isExpanded={isExpanded}>
                        Bem-vindo, {userName}!
                    </WelcomeMessage>
                )}

                <NavItems>
                    <NavItem>
                        <StyledNavLink to="/home" $isExpanded={isExpanded}>
                            <Home size={24} />
                            {isExpanded && <span>Home</span>}
                        </StyledNavLink>
                    </NavItem>
                    <NavItem>
                        <StyledNavLink to="/despesas" $isExpanded={isExpanded}>
                            <Receipt size={24} />
                            {isExpanded && <span>Despesas</span>}
                        </StyledNavLink>
                    </NavItem>

                    {isAdmin && (
                        <NavItem>
                            <StyledNavLink
                                to="/tipos-de-despesas"
                                $isExpanded={isExpanded}
                            >
                                <List size={24} />
                                {isExpanded && <span>Tipos de Despesas</span>}
                            </StyledNavLink>
                        </NavItem>
                    )}

                    {isAdmin && (
                        <NavItem>
                            <StyledNavLink
                                to="/usuarios"
                                $isExpanded={isExpanded}
                            >
                                <List size={24} />
                                {isExpanded && <span>Lista de Usuários</span>}
                            </StyledNavLink>
                        </NavItem>
                    )}

                    <NavItem>
                        <LogoutButton
                            onClick={handleLogout}
                            $isExpanded={isExpanded}
                        >
                            <LogOut size={24} />
                            {isExpanded && <span>Sair</span>}
                        </LogoutButton>
                    </NavItem>
                </NavItems>

                <FooterContainer>
                    <ThemeToggleButton
                        onClick={toggleTheme}
                        $isDarkMode={isDarkMode}
                        $isExpanded={isExpanded}
                    >
                        {isDarkMode ? <Moon size={24} /> : <Sun size={24} />}
                        {isExpanded && (
                            <span>
                                {isDarkMode ? 'Modo Claro' : 'Modo Escuro'}
                            </span>
                        )}
                    </ThemeToggleButton>
                </FooterContainer>
            </SidebarContainer>
        </>
    );
};

export default Sidebar;
