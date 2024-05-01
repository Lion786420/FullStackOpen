import React from "react";

const Filter = ({ filter, filterHandler }) => {
  return (
    <div>
      Filter by Name
      <input
        value={filter}
        onChange={(event) => filterHandler(event.target.value)}
      />
    </div>
  );
};

export default Filter;
