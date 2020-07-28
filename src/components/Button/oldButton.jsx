import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import themes from 'styled-theming';
import PropTypes from 'prop-types';

const backgroundBorderColor = themes('variant', {
  default: ({ theme, disabled }) =>
    disabled ? theme.color.grey[500] : theme.color.grey[400],
  success: ({ theme, disabled }) =>
    disabled ? theme.color.green[800] : theme.color.green[500],
});

const color = themes('variant', {
  default: ({ theme, disabled }) =>
    disabled ? theme.color.grey[800] : theme.color.black,
  success: ({ theme, disabled }) =>
    disabled ? theme.color.grey[500] : theme.color.white,
});

// hover
const hoverBorderColor = themes('variant', {
  default: ({ theme, disabled }) =>
    disabled ? theme.color.grey[500] : theme.color.black,
  success: ({ theme, disabled }) => theme.color.green[disabled ? 800 : 500],
});

const hoverBgColor = themes('variant', {
  default: ({ theme, disabled }) =>
    disabled ? theme.color.grey[500] : theme.color.grey[200],
  success: ({ theme, disabled }) => theme.color.green[disabled ? 800 : 600],
});

const hoverColor = themes('variant', {
  default: ({ theme, disabled }) =>
    disabled ? theme.color.grey[800] : theme.color.black,
  success: ({ theme, disabled }) => theme.color.grey[disabled ? 500 : 400],
});

const ButtonStyles = styled.button`
  cursor: pointer;
  font-size: 16px;
  border-radius: 3px;
  padding: 0.25em 1em;
  transition: 0.5s all ease-out;
  background: ${backgroundBorderColor};
  border: 1px solid ${backgroundBorderColor};
  color: ${color};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background: ${hoverBgColor};
    border-color: ${hoverBorderColor};
    color: ${hoverColor};
  }
`;

ButtonStyles.defaultProps = {
  variant: 'default',
};

ButtonStyles.propTypes = {
  variant: PropTypes.oneOf(['default', 'success']),
};

const oldButton = ({
  children,
  isLoading,
  disabled,
  variant = 'default',
  ...rest
}) => {
  const loadingComponent = 'Loading...';
  return (
    <ThemeProvider theme={{ variant }}>
      <ButtonStyles {...rest} disabled={disabled || isLoading}>
        {isLoading ? loadingComponent : children}
      </ButtonStyles>
    </ThemeProvider>
  );
};

export default oldButton;
