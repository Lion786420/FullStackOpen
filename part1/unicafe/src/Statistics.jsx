import React from "react";
import StatisticLine from "./StatisticLine";

const Statistics = ({ good, neutral, bad }) => {
  return (
    <>
      <h1>Statistics</h1>
      <StatisticLine text="Good" value={good} />
      <StatisticLine text="Neutral" value={neutral} />
      <StatisticLine text="Bad" value={bad} />
      <StatisticLine text="All" value={good + bad + neutral} />
      <StatisticLine
        text="Average"
        value={(good * 1 + neutral * 0 - bad * 1) / (good + bad + neutral)}
      />
      <StatisticLine
        text="Positive"
        value={(good / (good + bad + neutral)) * 100 + "%"}
      />
    </>
  );
};

export default Statistics;
