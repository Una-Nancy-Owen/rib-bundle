import styled from 'styled-components';

export const Button = styled.button<{ color?: 'primary' | 'danger' }>`
  background: ${({ color = 'primary' }) =>
    color === 'primary' ? 'royalblue' : 'crimson'};
  color: white;
  padding: 0.5em;
  margin: 0.5em;
  font-size: 1.2rem;
  border: none;
  border-radius: 3px;

  &:active {
    box-shadow: 0 0 0 2px white;
  }
`;

export const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  font-size: 1.2rem;
  color: '#666';
  background: #ddd;
  border: none;
  border-radius: 3px;
`;