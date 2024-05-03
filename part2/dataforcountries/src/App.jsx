import { useEffect, useState } from "react";
import DisplayMultiple from "./Components/DisplayMultiple";
import axios from "axios";
import DisplaySingle from "./Components/DisplaySingle";

function App() {
  const [input, setInput] = useState("");
  const [countryData, setCountryData] = useState([]);
  const [searched, setSearched] = useState([]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountryData(response.data);
      });
  }, []);

  const changeHandler = (event) => {
    setInput(event.target.value);
    setSearched(
      countryData.filter((country) => {
        return country.name.common.toLowerCase().includes(input.toLowerCase());
      })
    );
  };

  const clickHandler = (name) => {
    console.log(name);
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then((response) => {
        setSearched(
          countryData.filter((country) => {
            return country.name.common.toLowerCase() == name.toLowerCase();
          })
        );
      });
  };

  return (
    <>
      <div>Find countries</div>
      <input value={input} onChange={changeHandler} />
      {input == "" ? (
        <div>Search in the input field</div>
      ) : (
        <div>
          <div>{searched.length > 10 ? "Please specify a bit more" : null}</div>
          {searched.length > 1 && searched.length < 11
            ? searched.map((country) => {
                return (
                  <DisplayMultiple
                    country={country}
                    clickHandler={() => clickHandler(country.name.common)}
                    key={country.name.common}
                  />
                );
              })
            : null}
          {searched.length == 1 ? (
            <DisplaySingle country={searched[0]} input={input} />
          ) : null}
        </div>
      )}
    </>
  );
}

export default App;
