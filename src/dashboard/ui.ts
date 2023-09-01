import styled from 'styled-components';

export const Button = styled.button`
  background-color: #6d97c9;
  color: #fff;
  padding: 5px 20px;
  margin: 1px 4px;
  font-size: 1rem;
  font-weight: 700;
  border: none;
  border-radius: 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  
  &:hover {
    background-color: #99c7ff;
  }

  &:active {
    box-shadow: 0 0 0 1px white;
    background-color: #3c5a7d;
  }

  &:disabled {
    color: #b9b9b9;
    box-shadow: none;
    background-color: #507197;
  }
`;

export const BasicButton = styled.button`
  width: 90px;
  height: 40px;
  margin: 5px 10px;
  font-size: 18px;
  color: #fff;
  border: none;
  box-sizing: border-box;
  border-radius: 20px;
  background-color: #9df;
  
  &:hover {
    border: 1px solid #9bf;
    background-color: #fff;
    color: #9df;
  }
  
  &:active {
    padding-top: 3px;
    border: 1px solid #7bf;
    background-color: #fff;
    color: #7bf;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-right: 10px;
`;

export const Input = styled.input`
  padding: 0.3em;
  margin: 0.3em;
  background-color: #d6d6d6;
  border: none;
  border-radius: 3px;
  height:32px;

  &:disabled {
    background-color: #7b7f87;
  }
`;

export const Select = styled.select`
  height:32px;
`;