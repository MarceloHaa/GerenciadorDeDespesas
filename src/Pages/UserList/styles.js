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

    th {
        border-radius: 5px;
        padding: 10px;
    }
    ,
    td {
        border: 1px solid #8f5833;
        padding: 3px;
        border-radius: 5px;
        text-align: center;
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

    &:hover {
        background-color: rgba(82, 64, 11, 0.93);
    }

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

export const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const ModalContent = styled.div`
    background: ${(props) => props.theme.background};
    padding: 2rem;
    border-radius: 10px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    color: ${(props) => props.theme.text};

    @media (max-width: 480px) {
        padding: 1rem;
        margin: 0 1rem;
    }
`;

export const FormRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    margin-top: 1rem;

    @media (max-width: 768px) {
        flex-wrap: wrap;
        gap: 0.75rem;
    }

    @media (max-width: 480px) {
        flex-direction: column;
        align-items: stretch;
    }
`;

export const InputField = styled.input`
    flex: 1;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #823a0e;
    border-radius: 5px;
    background-color: ${(props) => props.theme.inputBackground || 'white'};
    color: ${(props) => props.theme.text};

    &:focus {
        outline: none;
        border-color: #5d0f02;
        box-shadow: 0 0 0 2px rgba(93, 15, 2, 0.2);
    }

    @media (max-width: 768px) {
        padding: 8px;
        font-size: 14px;
    }

    @media (max-width: 480px) {
        padding: 6px;
        font-size: 12px;
    }
`;

export const ModalActions = styled.div`
    display: flex;
    gap: 1rem;

    ${Button} {
        flex: 1;
    }

    @media (max-width: 768px) {
        flex-wrap: wrap;
    }

    @media (max-width: 480px) {
        flex-direction: column;
    }
`;
export const PageContainer = styled.div`
    min-height: 100vh;
    background-color:${(props) => props.theme.secondaryBackground};
    padding: 2rem;

     @media (max-width: 768px) {
        padding: 1rem;
`;

export const FormCard = styled.div`
    background: ${(props) => props.theme.thirdBackground};
    border-radius: 16px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 850px;
    margin: 0 auto;
    padding: 2rem;

    @media (max-width: 768px) {
        padding: 1rem;
        margin: 0 1rem;
    }
`;
export const ContainerEdit = styled.div`
    color: ${(props) => props.theme.text};
    margin-top: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 0.5rem;
    }
`;
export const TypeInput = styled.input`
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
