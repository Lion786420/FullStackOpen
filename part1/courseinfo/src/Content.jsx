import React from "react";
import Part from "./Part";

const Content = (props) => {
  return (
    <>
      <Part part={props.part1} exerciseNumber={props.exerciseNumber1} />
      <Part part={props.part2} exerciseNumber={props.exerciseNumber2} />
      <Part part={props.part3} exerciseNumber={props.exerciseNumber3} />
    </>
  );
};

export default Content;
