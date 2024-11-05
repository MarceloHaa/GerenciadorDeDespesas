import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    min-width: 100vw;
    background: linear-gradient(
        0.25turn,
        #f5e9e1 0%,
        #d6ba98 10%,
        #d8b79b 40%,
        #a86e42 70%,
        #823a0e 85%,
        #54260a 100%
    );
`;

export const Form = styled.form`
    display: flex;
    padding: 3rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(
        0.25turn,
        #a86e42 0%,
        #823a0e 58%,
        #54260a 100%
    );

    border-radius: 10px;
    width: 100%;
    max-width: 450px;
    gap: 30px 0px;
    box-shadow: 15px 15px 10px #561f02;

    h1 {
        color: white;
        font-size: 20px;
        font-weight: light;
    }

    p {
        color: white;
        font-size: 16px;
        font-weight: bold;
    }

    a {
        color: white;
        font-size: 14px;
    }
`;

export const SubContainerSign = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0px 20px;
    align-items: center;
`;
export const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;
export const LoadingOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(56, 56, 56, 0.8);
    z-index: 9999;
`;

export const LoadingSpinner = styled.div`
    border: 4px solid #f3f3f3;
    border-top: 4px solid #8f5833;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: ${spin} 1s linear infinite;
`;
