import React from 'react';
import styled from 'styled-components';

const ButtonStyles = styled.button`
  cursor: pointer;
  background: ${({ theme }) => theme.color.green[500]};
  font-size: 16px;
  border-radius: 3px;
  color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.green[500]};
  margin: 0 1em;
  padding: 0.25em 1em;
  transition: 0.5s all ease-out;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  
  &:hover {
    background: ${({ theme }) => theme.color.green[600]};
    border-color: ${({ theme }) => theme.color.green[500]};
    color: #d8d8d8;
  }
`;

const Button = ({ children, isLoading, ...rest }) => {
  const loadingComponent = 'Loading...';
  return <ButtonStyles {...rest}>{isLoading ? loadingComponent : children}</ButtonStyles>;
};


export default Button;
