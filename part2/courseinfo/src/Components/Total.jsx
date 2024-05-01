import React from "react";

const Total = ({ course }) => {
  const total = course.parts.reduce((sum, p) => sum + p.exercises, 0);
  return <p>Total number of excercises {total}</p>;
};

export default Total;
