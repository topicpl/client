import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { AiOutlineReload } from 'react-icons/ai';

const Button = ({ Icon, color, onClick, isLoading, ...rest }) => {
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
    <Container style={{ backgroundColor: bgColor }} onClick={onClick} {...rest}>
      {isLoading ? (
        <AiOutlineReload color="#fff" size="20px" className="loading" />
      ) : (
        <Icon color="#fff" size="20px" />
      )}
    </Container>
  );
};

export default Button;

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  backdrop-filter: blur(6px);
  border-radius: 100%;
  border: none;
  cursor: pointer;
  outline: none;
  color: ${({ theme }) => theme.color.white};
  -webkit-box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.25);

  .loading {
    -webkit-animation: spin 0.8s infinite ease-out;
    animation: spin 0.8s infinite ease-out;
    -moz-animation: spin 0.8s infinite ease-out;
    @-moz-keyframes spin {
      from {
        -moz-transform: rotate(0deg);
      }
      to {
        -moz-transform: rotate(360deg);
      }
    }
    @-webkit-keyframes spin {
      from {
        -webkit-transform: rotate(0deg);
      }
      to {
        -webkit-transform: rotate(360deg);
      }
    }
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
`;
