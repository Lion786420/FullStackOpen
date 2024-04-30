import React from "react";

const Total = (props) => {
  return (
    <p>
      Total number of excercises{" "}
      {props.course.parts[0].exercises +
        props.course.parts[1].exercises +
        props.course.parts[2].exercises}
    </p>
  );
};

export default Total;
