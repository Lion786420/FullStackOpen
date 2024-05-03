import React from "react";

const DisplayMultiple = ({ country, clickHandler }) => {
  return (
    <>
      <li key={country.name.common}>
        {country.name.common}
        <button onClick={clickHandler}>Show</button>
      </li>
    </>
  );
};

export default DisplayMultiple;
