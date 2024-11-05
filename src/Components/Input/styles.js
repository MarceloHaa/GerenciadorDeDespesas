import styled from 'styled-components';

export const InputCustomizado = styled.input`
  color: white;
  font-size: 20px;
  background-color: transparent;
  border: 2px solid #f5e9e1;
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 16px 20px;
  width: 100%;

    input::placeholder {
      color: white;
      font-size: 12px;
      opacity 0.7;
    }

`;
