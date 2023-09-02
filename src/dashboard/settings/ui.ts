import styled from 'styled-components';

export const RunnerDataListContainerUl = styled.ul`
  list-style: none;
  padding: 0;
  overflow: auto;
  max-height: 1000px;
  overflow-x: hidden;
`;

export const RunnerDataUl = styled.ul`
  list-style: none;
  background: rgba(50, 180, 200, 0.3);
  border: 1px solid #fff;
  border-radius: 0.3rem;
  margin: 0.5rem;
  padding: 0;
`;

export const RunnerDataLi = styled.li`
  border: 1px dashed rgba(255, 255, 255, 0.2);
  margin: 0 0 -1px;
  padding: 2px 4px;
  overflow-wrap: break-word;
`;