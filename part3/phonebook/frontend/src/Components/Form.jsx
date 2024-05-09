import React from "react";

const Form = (props) => {
  return (
    <form onSubmit={props.submitHandler}>
      <div>
        Name:{" "}
        <input
          value={props.newName}
          onChange={(event) => {
            props.setNewName(event.target.value);
          }}
        />
      </div>
      <div>
        Phone:{" "}
        <input
          value={props.newPhone}
          onChange={(event) => {
            props.setNewPhone(event.target.value);
          }}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default Form;
