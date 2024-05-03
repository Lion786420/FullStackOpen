import React, { useEffect, useState } from "react";
const api_key = import.meta.env.VITE_SOME_KEY;
import axios from "axios";

const DisplaySingle = ({ country, input }) => {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${country.capital}&aqi=no`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [input]);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital}</div>
      <div>
        <b>Languages</b>
        {Object.values(country.languages).map((language, i) => (
          <li key={i}>{language}</li>
        ))}
      </div>
      <div>
        <img src={country.flags.png} alt={`${country.common} flag`} />
      </div>
      <h1>Weather in {country.capital}</h1>
      {weather ? (
        <div>
          <div>
            <b>Temperature: </b>
            {weather.current.temp_c} degree celcius
          </div>
          <div>
            <b>Wind: {weather.current.wind_kph} km/hr</b>
          </div>
          <div>
            <b>Condition: </b>
            {weather.current.condition.text}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DisplaySingle;
