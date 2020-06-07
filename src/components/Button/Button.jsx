import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import themes from 'styled-theming';
import PropTypes from 'prop-types';

const backgroundBorderColor = themes('variant', {
  default: ({ theme }) => theme.color.grey[300],
  success: ({ theme }) => theme.color.green[500],
});

const hoverBorderColor = themes('variant', {
  default: ({ theme }) => theme.color.black,
  success: ({ theme }) => theme.color.green[500],
});

const hoverBgColor = themes('variant', {
  default: ({ theme }) => theme.color.grey[500],
  success: ({ theme }) => theme.color.green[600],
});

const hoverColor = themes('variant', {
  default: ({ theme }) => theme.color.black,
  success: ({ theme }) => theme.color.grey[400],
});

const color = themes('variant', {
  default: ({ theme }) => theme.color.black,
  success: ({ theme }) => theme.color.white,
});


const ButtonStyles = styled.button`
  cursor: pointer;
  background: ${backgroundBorderColor};
  font-size: 16px;
  border-radius: 3px;
  color: ${color};
  border: 1px solid ${backgroundBorderColor};
  padding: 0.25em 1em;
  transition: 0.5s all ease-out;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background: ${({ disabled }) => (disabled ? '' : hoverBgColor)};
    border-color: ${hoverBorderColor};
    color: ${({ disabled }) => (disabled ? '' : hoverColor)};
  }
`;

ButtonStyles.defaultProps = {
  variant: 'default',
};

ButtonStyles.propTypes = {
  variant: PropTypes.oneOf(['default', 'primary', 'success', 'warning']),
};

const Button = ({ children, isLoading, variant = 'default', ...rest }) => {
  const loadingComponent = 'Loading...';
  return (
    <ThemeProvider theme={{ variant }}>
      <ButtonStyles {...rest}>{isLoading ? loadingComponent : children}</ButtonStyles>
      ;
    </ThemeProvider>
  );
};


export default Button;
