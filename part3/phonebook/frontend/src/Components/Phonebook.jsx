import React from "react";

const Phonebook = ({ person, deleteHandler }) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={deleteHandler}>Delete</button>
    </div>
  );
};

export default Phonebook;
