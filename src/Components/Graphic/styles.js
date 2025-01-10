import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const DashboardContainer = styled.div`
    height: 100%;
    display: flex;
    padding: 2rem;
    overflow: hidden;
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    @media (max-width: 768px) {
        padding: 1rem;
        flex-direction: column;
    }
`;

export const ChartContainer = styled.div`
    background-color: ${(props) => props.theme.secondaryBackground};
    padding: 1.5rem;
    margin-bottom: 1rem;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: hidden;

    h2 {
        margin-bottom: 3rem;
        color: ${(props) => props.theme.text};
        text-align: center;
        width: 100%;
    }

    @media (max-width: 768px) {
        padding: 1rem;
    }

    @media (max-width: 480px) {
        padding: 0.5rem;
    }
`;
export const FilterContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    width: 100%;
    margin-bottom: 1rem;

    label {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
        font-weight: 500;

        span {
            color: ${(props) => props.theme.text};
        }
    }

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
`;

export const ChartContent = styled.div`
    width: 100%;
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

export const ChartScrollContainer = styled.div`
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: 1rem;

    &:hover {
        cursor: grab;
    }
    &::-webkit-scrollbar {
        height: 8px;
    }

    &::-webkit-scrollbar-track {
        background: ${(props) => props.theme.scrollbarTrack};
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background: ${(props) => props.theme.scrollbarThumb};
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: ${(props) => props.theme.scrollbarThumbHover};
    }
`;
export const ToggleButton = styled.button`
    padding: 8px 16px;
    background-color: #54260a;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #8f5833;
    }
`;
export const FilterButton = styled.button`
    margin-top: 35px;
    width: 30%;
    height: 40px;
    padding: 15px 8px;
    background-color: #54260a;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #8f5833;
    }
`;

export const SelectContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
<<<<<<< HEAD:src/Components/Graficos/styles.js
    margin-bottom: 1.5rem;
    flex-direction: row;
=======
    margin-bottom: 2rem;
>>>>>>> 26467702075bbb4e129d60e193fa60c0f0a598c4:src/Components/Graphic/styles.js
    flex-wrap: wrap;
    width: 100%;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 0.5rem;
    }
`;

export const RangeFilter = styled.div`
    display: flex;
    gap: 16px;
`;

export const PickerContainer = styled.div`
    margin: 8px 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    label {
        color: #54260a;
        font-weight: 500;
        align-items: center;
    }
`;

export const StyledLabel = styled.label`
    display: flex;
    flex-direction: row;
    gap: 0.3rem;
    font-weight: 500;
    align-items: center;
    color: #54260a;
`;

export const TypeInput = styled.input`
    width: 35%;
    border: 2px solid #a66b44;
    border-radius: 10px;
    font-size: 1rem;
    color: ${(props) => props.theme.text};
    text-align: center;
    background-color: ${(props) => props.theme.thirdBackground};
    transition: all 0.2s ease-in-out;
    padding: 0.3rem;

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
export const StyledSelect = styled.select`
    width: 100%;
    border: 2px solid #a66b44;
    border-radius: 10px;
    font-size: 1rem;
    color: ${(props) => props.theme.text};
    text-align: center;
    background-color: ${(props) => props.theme.thirdBackground};
    transition: all 0.2s ease-in-out;
    padding: 0.3rem;

    &:focus {
        outline: none;
        border-color: #823a0e;
        box-shadow: 0 0 0 2px rgba(130, 58, 14, 0.2);
    }

    option {
        background-color: ${(props) => props.theme.thirdBackground};
        color: #54260a;
    }

    @media (max-width: 768px) {
        padding: 0.75rem 1rem 0.75rem 2.5rem;
        font-size: 0.9rem;
    }
`;

export const StyledDatePicker = styled(DatePicker)`
    width: 103%;
    border: 2px solid #a66b44;
    border-radius: 10px;
    font-size: 1rem;
    color: ${(props) => props.theme.text};
    text-align: center;
    background-color: ${(props) => props.theme.thirdBackground};
    transition: all 0.2s ease-in-out;
    padding: 0.5rem;

    &:focus {
        outline: none;
        border-color: #823a0e;
        box-shadow: 0 0 0 2px rgba(130, 58, 14, 0.2);
    }

    &::placeholder {
        color: #a66b44;
    }
            }
`;

export const SelectMonth = styled.select`
    padding: 0.5rem;
    margin-bottom: 2rem;
    gap: 1rem;
    border: 1px solid ${(props) => props.theme.border};
    border-radius: 7px;
    font-size: 1rem;
    background-color: ${(props) => props.theme.selectBackground};
    color: ${(props) => props.theme.text};
    width: 100px;
    text-align: center;
    outline: none;

    &:focus {
        border-color: ${(props) => props.theme.focusBorder};
    }

    @media (max-width: 480px) {
        width: 100%;
    }
`;

export const DateInput = styled.input`
    padding: 0.5rem;
    border: 1px solid ${(props) => props.theme.border};
    border-radius: 4px;
    font-size: 1rem;
    background-color: ${(props) => props.theme.inputBackground};
    color: ${(props) => props.theme.text};
    outline: none;
    width: 200px;

    &:focus {
        border-color: ${(props) => props.theme.focusBorder};
    }

    @media (max-width: 480px) {
        width: 100%;
    }
`;

export const InvoiceDayInput = styled.input`
    padding: 0.5rem;
    border: 1px solid ${(props) => props.theme.border};
    border-radius: 4px;
    font-size: 1rem;
    background-color: ${(props) => props.theme.inputBackground};
    color: ${(props) => props.theme.text};
    outline: none;
    width: 100px;

    &:focus {
        border-color: ${(props) => props.theme.focusBorder};
    }

    @media (max-width: 480px) {
        width: 100%;
    }
`;

export const TotalContainer = styled.div`
    margin: 1rem 0;
    font-weight: bold;
    color: ${(props) => props.theme.text};
    text-align: right;
    width: 100%;

    @media (max-width: 768px) {
        text-align: center;
    }
`;
export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        color: ${(props) => props.theme.buttonText};
        background-color: ${(props) => props.theme.buttonBackground};
        cursor: pointer;

        &:hover {
            background-color: ${(props) => props.theme.buttonHoverBackground};
        }

        &:disabled {
            background-color: ${(props) =>
                props.theme.buttonDisabledBackground};
            cursor: not-allowed;
        }
    }
`;
