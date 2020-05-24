import React from 'react';

const buttonStyle = {
  margin: '10px 10px 10px 0',
};

const Button = (props) => {
  const { handleClick, children } = props;
  return <button {...props} style={buttonStyle} onClick={handleClick}>{children}</button>;
};


export default Button;
