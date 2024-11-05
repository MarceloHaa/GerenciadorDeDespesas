import styled from 'styled-components';

export const ButtonLogaut = styled.button`
    background-color: transparent;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 20px;
    display: flex;
    align-items: center;
    position: relative; /* Necessário para posicionar o tooltip */
    transition: color 0.3s ease;

    &:hover {
        color: #ff725c;
    }
`;

export const Tooltip = styled.span`
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(119, 53, 4, 0.8);
    color: white;
    padding: 5px;
    border-radius: 3px;
    white-space: nowrap;
    font-size: 12px;
    opacity: 0; /* Invisível por padrão */
    visibility: hidden;
    transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;

    ${ButtonLogaut}:hover & {
        opacity: 1;
        visibility: visible;
    }
`;
