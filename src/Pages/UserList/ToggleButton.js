import React from 'react';
import styled from 'styled-components';

const ToggleButtonWrapper = styled.button`
    background-color: ${(props) => (props.$isActive ? '#463400' : '#5d0f02')};
    border: none;
    border-radius: 50px;
    color: white;
    padding: 8px 10px;
    text-align: center;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    min-width: 120px;
    transition: all 0.3s ease;
    opacity: ${(props) => (props.$disabled ? 0.6 : 1)};
    pointer-events: ${(props) => (props.$disabled ? 'none' : 'auto')};
    position: relative;

    &:hover {
        background-color: ${(props) =>
            props.$isActive ? '#5d4a00' : '#7a1a0a'};
    }

    @media (max-width: 768px) {
        padding: 8px 16px;
        font-size: 14px;
        min-width: 100px;
    }

    @media (max-width: 480px) {
        padding: 6px 12px;
        font-size: 12px;
        min-width: 90px;
    }
`;

const StatusDot = styled.span`
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: ${(props) => (props.$isActive ? '#808000' : '#f00')};
    opacity: 0.9;
    transition: transform 0.3s ease;
    position: absolute;
    left: 5px;
    transform: translateX(
        ${(props) => (props.$isActive ? 'calc(100% + 45px)' : '0')}
    );
`;

const ButtonText = styled.span`
    margin-left: ${(props) => (props.$isActive ? 'auto' : '40px')};
    margin-right: ${(props) => (props.$isActive ? '40px' : 'auto')};
`;

const ToggleButton = ({ isActive, onToggle, disabled, className }) => {
    return (
        <ToggleButtonWrapper
            $isActive={isActive}
            onClick={onToggle}
            $disabled={disabled}
            className={className}
        >
            <StatusDot $isActive={isActive} />
            <ButtonText $isActive={isActive}>
                {isActive ? 'Ativo' : 'Inativo'}
            </ButtonText>
        </ToggleButtonWrapper>
    );
};

export default ToggleButton;
