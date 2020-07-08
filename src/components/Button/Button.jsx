import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Button = ({ variant }) => {
  const [color, setColor] = useState(null);
  const [Icon, setIcon] = useState(null);

  useEffect(() => {
    if (variant === 'default') {
      setColor('#000');
      setIcon(FaThumbsUp);
    }
  });

  return (
    <Container>
      <Icon color="#fff" size="20px" />
    </Container>
  );
};

export default Button;

const Container = styled.button`
  background-color: red;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  border: none;
  cursor: pointer;
  outline: none;
  color: ${({ theme }) => theme.color.white};
  -webkit-box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.25);
`;
