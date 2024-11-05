import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const MobileOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
`;
export const MenuButton = styled.button`
    position: fixed;
    top: 1rem;
    left: 1rem;
    z-index: 1001;
    background: none;
    border: none;
    color: ${(props) => props.theme.text};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;

    @media (min-width: 769px) {
        display: none;
    }
`;

export const SidebarContainer = styled.nav`
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    width: ${(props) => (props.$isExpanded ? '240px' : '70px')};
    transition: all 0.3s ease;
    padding: 1rem 0;
    box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    z-index: 1000;

    @media (max-width: 768px) {
        transform: translateX(
            ${(props) => (props.$isExpanded ? '0' : '-100%')}
        );
        width: 240px;
    }
`;

export const LogoImage = styled.img`
    width: ${(props) => (props.$isExpanded ? '150px' : '50px')};
    height: auto;
    border-radius: 25px;
    margin: 0 auto 2rem;
    display: block;
    transition: width 0.3s ease;
    padding: 0 10px;
`;

export const NavItems = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 100%;
    flex-grow: 1;
`;

export const NavItem = styled.li`
    width: 100%;
    margin-bottom: 0.5rem;
`;

export const StyledNavLink = styled(NavLink)`
    display: flex;
    align-items: center;
    justify-content: ${(props) =>
        props.$isExpanded ? 'flex-start' : 'center'};
    color: white;
    text-decoration: none;
    padding: 0.75rem 1rem;
    transition: background-color 0.2s;

    &:hover {
        background-color: ${(props) => props.theme.backgroundHover};
    }

    &.active span {
        border-bottom: ${(props) =>
            props.$isExpanded
                ? props.theme.borderbottom
                    ? '3px solid #fff'
                    : '3px solid #522509'
                : 'none'};

        padding-bottom: 8px;
    }

    span {
        margin-left: 1rem;
        white-space: nowrap;
        display: inline-block;
    }
`;

export const LogoutButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: ${(props) =>
        props.$isExpanded ? 'flex-start' : 'center'};
    width: 100%;
    background: none;
    border: none;
    color: white;
    padding: 0.75rem 1rem;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: ${(props) => props.theme.backgroundHover};
    }

    span {
        margin-left: 1rem;
        white-space: nowrap;
    }
`;

export const FooterContainer = styled.div`
    margin-top: auto;
    width: 100%;
`;

export const WelcomeMessage = styled.div`
    font-size: ${(props) => (props.$isExpanded ? '1.25rem' : '0')};
    font-weight: bold;
    margin: 1rem 0;
    text-align: center;
    opacity: ${(props) => (props.$isExpanded ? 1 : 0)};
    transition: opacity 0.3s ease, font-size 0.3s ease;
`;

export const ThemeToggleButton = styled.button`
    display: flex;
    align-items: center;
    font-weight: bold;
    justify-content: ${(props) =>
        props.$isExpanded ? 'flex-start' : 'center'};
    width: 100%;
    background: none;
    border: none;
    color: ${(props) => props.theme.text};
    padding: 0.75rem 1rem;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: ${(props) => props.theme.backgroundHover};
    }

    span {
        margin-left: 1rem;
        white-space: nowrap;
    }
`;
