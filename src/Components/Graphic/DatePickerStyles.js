import { createGlobalStyle } from 'styled-components';

export const DatePickerGlobalStyles = createGlobalStyle`
  .react-datepicker {
    font-family: inherit;
    border: 2px solid #a66b44;
    border-radius: 10px;
  }

  .react-datepicker__header {
    background-color: ${(props) => props.theme.thirdBackground};
    border-bottom: 1px solid #a66b44;
  }

  .react-datepicker__day--selected {
    background-color: #a66b44 !important;
    color: white;
    
    &:hover {
      background-color: #823a0e !important;
    }
  }

  .react-datepicker__day:hover {
    background-color: rgba(166, 107, 68, 0.2);
  }
`;
