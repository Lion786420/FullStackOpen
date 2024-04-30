import React from "react";

const Button = (props) => {
  return <button onClick={props.clickHandler}>{props.feedback}</button>;
};

export default Button;
