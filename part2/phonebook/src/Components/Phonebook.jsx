import React from "react";

const Phonebook = ({ personToShow }) => {
  return (
    <div>
      {personToShow.map((person) => (
        <div key={person.id}>
          {person.name} {person.phone}
        </div>
      ))}
    </div>
  );
};

export default Phonebook;
