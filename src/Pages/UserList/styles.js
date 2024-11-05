import styled from 'styled-components';

export const Container = styled.div`
    padding: 5rem;

    @media (max-width: 768px) {
        padding: 2rem;
    }

    @media (max-width: 480px) {
        padding: 1rem;
    }
`;

export const Title = styled.h1`
    color: ${(props) => props.theme.text};
    font-size: 1.875rem;
    font-weight: bold;
    margin-bottom: 2rem;
    text-align: center;

    @media (max-width: 768px) {
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
    }

    @media (max-width: 480px) {
        font-size: 1.25rem;
        margin-bottom: 1rem;
    }
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    border-radius: 10px;

    th,
    td {
        border: 1px solid #54260a;
        padding: 8px;
        text-align: left;
        color: ${(props) => props.theme.text};

        @media (max-width: 768px) {
            padding: 6px;
            font-size: 14px;
        }

        @media (max-width: 480px) {
            padding: 4px;
            font-size: 12px;
        }
    }

    th {
        background-color: ${(props) => props.theme.background};
        font-size: 18px;

        @media (max-width: 768px) {
            font-size: 16px;
        }

        @media (max-width: 480px) {
            font-size: 14px;
        }
    }

    @media (max-width: 480px) {
        display: block;
        overflow-x: auto;
    }
`;

export const Button = styled.button`
    background-color: ${(props) => (props.isActive ? '#5d0f02' : ' #463400')};
    border: none;
    border-radius: 10px;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    align-items: center;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    min-width: 100px;

    &:disabled {
        background-color: #823a0e;
        cursor: not-allowed;
    }

    @media (max-width: 768px) {
        padding: 8px 16px;
        font-size: 14px;
        min-width: 80px;
    }

    @media (max-width: 480px) {
        padding: 6px 12px;
        font-size: 12px;
        min-width: 60px;
    }
`;

export const Pagination = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;

    @media (max-width: 480px) {
        flex-direction: column;
        gap: 1rem;
    }
`;

export const SearchInput = styled.input`
    padding: 10px;
    font-size: 16px;
    margin-bottom: 20px;
    width: 100%;
    max-width: 1400px;
    border: 1px solid #823a0e;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
        padding: 8px;
        font-size: 14px;
    }

    @media (max-width: 480px) {
        padding: 6px;
        font-size: 12px;
    }
`;

export const FilterContainer = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 20px;

    ${SearchInput} {
        margin-bottom: 0;
    }

    ${Button} {
        min-width: 100px;
    }

    @media (max-width: 768px) {
        flex-wrap: wrap;
        gap: 0.75rem;

        ${Button} {
            min-width: 80px;
        }
    }

    @media (max-width: 480px) {
        flex-direction: column;
        gap: 0.5rem;

        ${Button} {
            width: 100%;
            min-width: auto;
        }
    }
`;
