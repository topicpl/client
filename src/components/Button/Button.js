import React from 'react';

var buttonStyle = {
  margin: '10px 10px 10px 0'
};

const Button = (props) => {
    return (
      <button {...props} style={buttonStyle} onClick={props.handleClick}>{props.children}</button>
    );
}


export default Button;