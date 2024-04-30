import { useState } from "react";
import Statistics from "./Statistics";
import Button from "./Button";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>Give Feedback</h1>
      <Button
        clickHandler={() => {
          setGood(good + 1);
        }}
        feedback="Good"
      />
      <Button
        feedback="Neutral"
        clickHandler={() => {
          setNeutral(neutral + 1);
        }}
      />
      <Button
        feedback="Bad"
        clickHandler={() => {
          setBad(bad + 1);
        }}
      />
      {!(good + bad + neutral === 0) ? (
        <Statistics good={good} neutral={neutral} bad={bad} />
      ) : (
        <div>No statistics found</div>
      )}
    </>
  );
};

export default App;
