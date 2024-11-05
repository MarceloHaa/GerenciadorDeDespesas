import React from 'react';
import styled from 'styled-components';

const Spinner = styled.div`
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #823a0e;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    animation: spin 1s linear infinite;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

const LoadingSpinner = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '2rem',
            }}
        >
            <Spinner />
        </div>
    );
};

export default LoadingSpinner;
