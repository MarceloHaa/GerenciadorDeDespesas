import styled from 'styled-components';

export const Container = styled.div`
    color: ${(props) => props.theme.text};
    padding: 6rem;
    width: 100%;
    margin: 0 auto;
    @media (max-width: 768px) {
        padding: 4rem;
    }

    @media (max-width: 480px) {
        padding: 2rem;
    }
`;

export const PageContainer = styled.div`
    min-height: 100vh;
    background-color: ${(props) => props.theme.secondaryBackground};
    padding: 2rem;

    @media (max-width: 768px) {
        padding: 1.5rem;
    }

    @media (max-width: 480px) {
        padding: 1rem;
    }
`;

export const FormCard = styled.div`
    background: ${(props) => props.theme.secondaryBackground};
    border-radius: 16px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;

    @media (max-width: 768px) {
        padding: 1.5rem;
        max-width: 100%;
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
    }

    @media (max-width: 480px) {
        font-size: 1.25rem;
    }
`;

export const FormGroup = styled.div`
    position: relative;
    margin-bottom: 1.5rem;
`;

export const InputIcon = styled.div`
    position: absolute;

    top: 50%;
    margin-left: 1rem;
    transform: translateY(-50%);
    color: ${(props) => props.theme.text};

    display: flex;
    align-items: center;
    pointer-events: none;
`;
export const InputGroup = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 480px) {
        grid-template-columns: 1fr;
    }
`;

export const Input = styled.input`
    width: 100%;
    padding: 0.875rem 1rem 0.875rem 3rem;
    border: 2px solid #a66b44;
    border-radius: 10px;
    font-size: 1rem;
    color: ${(props) => props.theme.text};
    background-color: ${(props) => props.theme.thirdBackground};
    transition: all 0.2s ease-in-out;

    &:focus {
        outline: none;
        border-color: #823a0e;
        box-shadow: 0 0 0 2px rgba(130, 58, 14, 0.2);
    }

    &::placeholder {
        color: #a66b44;
    }
`;

export const Select = styled.select`
    width: 100%;
    padding: 0.875rem 1rem 0.875rem 3rem;
    border: 2px solid #a66b44;
    border-radius: 10px;
    font-size: 1rem;
    color: ${(props) => props.theme.text};
    background-color: ${(props) => props.theme.thirdBackground};
    transition: all 0.2s ease-in-out;
    appearance: none;
    cursor: pointer;

    &:focus {
        outline: none;
        border-color: ${(props) => props.border};
        box-shadow: 0 0 0 2px rgba(130, 58, 14, 0.2);
    }
`;

export const ExpenseTable = styled.table`
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin-top: 1rem;
    background: ${(props) => props.theme.thirdBackground};
    border-radius: 10px;
    overflow-x: auto;
    display: block;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
        font-size: 0.875rem;
    }

    @media (max-width: 480px) {
        font-size: 0.75rem;
    }
`;

export const TableHeader = styled.th`
    background-color: #8f5833;
    width: 100%;
    color: white;
    font-weight: 600;
    padding: 1rem;
    text-align: left;
    transition: background-color 0.2s;
    white-space: nowrap;
`;

export const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: ${(props) => props.theme.thirdBackground};
    }

    &:hover {
        background-color: ${(props) => props.theme.bacgroundList};
    }
`;

export const TableCell = styled.td`
    width: 100%;
    padding: 0.7rem;
    border-bottom: 1px solid #eee;
    color: #54260a;
    white-space: nowrap;
`;

export const ButtonGroup = styled.div`
    display: flex;
    gap: 2rem;
    margin-top: 2rem;
`;

export const Button = styled.button`
    flex: 1;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
    color: white;
    background-color: ${(props) =>
        props.variant === 'danger' ? '#6e0808' : '#823a0e'};
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    margin-left: 0.5rem; // Espaçamento entre os botões
    margin-right: 0.5rem;

    &:hover {
        background-color: ${(props) =>
            props.variant === 'danger' ? '#8f0a0a' : '#54260a'};
    }

    &:disabled {
        background-color: #ebbfa4;
        cursor: not-allowed;
    }
    @media (max-width: 480px) {
        padding: 0.3rem;
    }
`;

export const ActionIcon = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 1rem;
    gap: 0.5rem;
    border-radius: 50%;
    color: #823a0e;
    transition: all 0.2s ease-in-out;

    &:hover {
        color: #54260a;
        background-color: rgba(130, 58, 14, 0.1);
    }
`;

export const FilterContainer = styled.div`
    margin-bottom: 2rem;
    background-color: ${(props) => props.theme.secondaryBackground};
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    form {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        @media (max-width: 768px) {
            flex-direction: column;
        }
        & > * {
            margin-bottom: 1rem;
        }
    }
`;

export const FilterInput = styled.input`
    padding: 0.6rem 0.8rem;
    border: 2px solid #a66b44;
    border-radius: 10px;
    font-size: 1rem;
    color: ${(props) => props.theme.text};
    background-color: ${(props) => props.theme.thirdBackground};
    transition: all 0.2s ease-in-out;
    flex: 1;
    margin-left: 1rem;

    &:focus {
        outline: none;
        border-color: #823a0e;
        box-shadow: 0 0 0 2px rgba(130, 58, 14, 0.2);
    }

    &::placeholder {
        color: #a66b44;
    }
`;

export const FilterButton = styled(Button)`
    background-color: #823a0e;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: bold;
    color: white;
    flex: 1;
    margin-right: 0.5rem;

    &:hover {
        background-color: #54260a;
    }
`;

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    gap: 1rem;

    span {
        color: #823a0e;
        font-weight: 500;
    }

    ${Button} {
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
        min-width: 100px;
        flex: none;
    }
    @media (max-width: 768px) {
        flex: 1;
    }
`;
