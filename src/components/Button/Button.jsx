import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = ({ Icon, color, onClick }) => {
  const [bgColor, setBgColor] = useState('transparent');

  Button.defaultProps = {
    bgColor: 'transparent',
  };

  Button.propTypes = {
    bgColor: PropTypes.oneOf(['transparent', 'red', 'green']),
  };

  useEffect(() => {
    if (color === 'green') setBgColor('#01da73');
    else if (color === 'red') setBgColor('#F44336');
    else setBgColor('transparent');
  });

  return (
    <Container style={{ backgroundColor: bgColor }} onClick={onClick}>
      <Icon color="#fff" size="20px" />
    </Container>
  );
};

export default Button;

const Container = styled.button`
  backdrop-filter: blur(6px);
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
