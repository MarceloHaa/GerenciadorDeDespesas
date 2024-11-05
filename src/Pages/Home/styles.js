import styled from 'styled-components';

export const Container = styled.div`
    margin-left: 70px;
    display: flex;
    flex-direction: row;
    padding: 2rem;
    min-height: 100vh;
    box-sizing: border-box;
    gap: 2rem;
    overflow: hidden;
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    @media (max-width: 768px) {
        margin-left: 0;
        padding: 1rem;
        padding-top: 4rem;
        flex-direction: column;
    }
`;

export const GraphicWrapper = styled.div`
    flex: 1;
    overflow: hidden;
    min-width: 0;

    @media (max-width: 768px) {
        min-width: 100%;
    }

    @media (max-width: 480px) {
        min-width: 100%;
        flex: none;
    }
`;
