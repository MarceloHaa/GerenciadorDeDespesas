import styled from 'styled-components';

export const DashboardContainer = styled.div`
    height: 100%;
    display: flex;
    overflow: hidden;
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    @media (max-width: 768px) {
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

export const SelectContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    width: 100%;

    label {
        font-size: 1rem;
        color: ${(props) => props.theme.text};
    }

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 0.5rem;
    }
`;

export const SelectMonth = styled.select`
    padding: 0.5rem;
    margin-bottom: 2rem;
    gap: 1rem;
    border: 1px solid ${(props) => props.theme.border};
    border-radius: 4px;
    font-size: 1rem;
    background-color: ${(props) => props.theme.selectBackground};
    color: ${(props) => props.theme.text};
    width: 200px;
    text-align: center;
    outline: none;

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
