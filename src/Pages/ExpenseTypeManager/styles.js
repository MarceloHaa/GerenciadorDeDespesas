import styled from 'styled-components';

export const Container = styled.div`
    color: ${(props) => props.theme.text};
    padding: 2rem;
    @media (max-width: 768px) {
        padding: 1rem;
    }
`;

export const PageContainer = styled.div`
    min-height: 100vh;
    background-color:${(props) => props.theme.secondaryBackground};
    padding: 2rem;

     @media (max-width: 768px) {
        padding: 1rem;
`;

export const Title = styled.h1`
    color: #54260a;
    font-size: 1.875rem;
    font-weight: bold;
    margin-bottom: 2rem;
    text-align: center;

    @media (max-width: 768px) {
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
    }
`;

export const Subtitle = styled.h2`
    font-size: 1.5rem;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
        font-size: 1.25rem;
    }
`;

export const ExpenseTypeList = styled.ul`
    list-style-type: none;
    padding: 2rem;

    @media (max-width: 768px) {
        padding: 1rem;
    }
`;

export const ExpenseTypeItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid #54260a;

      @media (max-width: 768px) {
        gap: 0.5rem;
        align-items: center;        
      
        input {
            flex: 1;
            margin-right: 0.5rem;
        }        
       
        div {
            display: flex;
            gap: 0.25rem;
        }

    input {
        flex-grow: 1;
        margin-right: 1rem;
        padding: 0.5rem;
        border: 1px solid #54260a;
        border-radius: 4px;

        @media (max-width: 768px) {
            margin-right: 0;
        }
    }
`;
export const FormCard = styled.div`
    background: ${(props) => props.theme.thirdBackground};
    border-radius: 16px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;

    @media (max-width: 768px) {
        padding: 1rem;
        margin: 0 1rem;
    }
`;

export const CreateExpenseTypeContainer = styled.div`
    margin-top: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 0.5rem;
    }
`;

export const CreateExpenseTypeInput = styled.input`
    width: 100%;
    padding: 0.875rem 1rem 0.875rem 3rem;
    border: 2px solid #a66b44;
    border-radius: 10px;
    font-size: 1rem;
    color: #54260a;
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
    @media (max-width: 768px) {
        padding: 0.75rem 1rem 0.75rem 2.5rem;
        font-size: 0.9rem;
    }
`;
export const FormGroup = styled.div`
    position: relative;
    margin-bottom: 1.5rem;

    @media (max-width: 768px) {
        margin-bottom: 1rem;
    }
`;
export const InputIcon = styled.div`
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #823a0e;
    display: flex;
    align-items: center;
    pointer-events: none;

    @media (max-width: 768px) {
        left: 0.75rem;
        svg {
            width: 1rem;
            height: 1rem;
        }
    }
`;
export const Select = styled.select`
    width: 100%;
    padding: 0.875rem 1rem 0.875rem 3rem;
    border: 2px solid #a66b44;
    border-radius: 10px;
    font-size: 1rem;
    color: #54260a;
    background-color: ${(props) => props.theme.thirdBackground};
    transition: all 0.2s ease-in-out;
    appearance: none;
    cursor: pointer;

    &:focus {
        outline: none;
        border-color: #823a0e;
        box-shadow: 0 0 0 2px rgba(130, 58, 14, 0.2);
    }

    @media (max-width: 768px) {
        padding: 0.75rem 1rem 0.75rem 2.5rem;
        font-size: 0.9rem;
    }
`;

export const Button = styled.button`
    background-color: #823a0e;
    color: #fff;
    margin-left: 30px;
    border: none;
    border-radius: 10px;
    padding: 0.8rem 1rem;
    cursor: pointer;

    &:hover {
        background-color: #54260a;
    }

    &:disabled {
        background-color: #a66b44;
        cursor: not-allowed;
    }
    @media (max-width: 768px) {
        margin-left: 0;
        width: 100%;
        padding: 0.7rem 0.9rem;
    }
`;

export const CancelButton = styled(Button)`
    background-color: #dc3545;

    &:hover {
        background-color: #c82333;
    }
`;

export const DeleteButton = styled(Button)`
    background-color: #dc3545;

    &:hover {
        background-color: #c82333;
    }
`;
export const ActionIcon = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    color: #823a0e;
    transition: all 0.2s ease-in-out;

    &:hover {
        color: #54260a;
        background-color: rgba(130, 58, 14, 0.1);
    }

    @media (max-width: 768px) {
        padding: 0.4rem;

        svg {
            width: 1.2rem;
            height: 1.2rem;
        }
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    gap: 1rem;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 0.5rem;
    }
`;

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    gap: 1rem;

    span {
        color: #823a0e;
    }

    ${Button} {
        padding: 0.3rem 0.8rem;
        font-size: 0.9rem;
    }

    @media (max-width: 768px) {
        gap: 0.5rem;
        flex-wrap: wrap;

        ${Button} {
            width: auto;
            padding: 0.3rem 0.6rem;
            font-size: 0.8rem;
        }
    }
`;
