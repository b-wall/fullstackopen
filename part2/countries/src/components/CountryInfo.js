import { useState, useEffect } from 'react';
import axios from 'axios';

const weather_api_key = process.env.REACT_APP_API_KEY;

const CountryInfo = ({ country }) => {
  const [weather, setWeather] = useState('undefined');
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${weather_api_key}&units=metric`;

  useEffect(() => {
    axios.get(url)
      .then(response => {
        setWeather(response.data);
      })
      .catch(err => console.log(err));
  },[url])
  
  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>

      <p><strong>Languages:</strong></p>
      <ul>
      {country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt={`${country.name}'s flag`} height='170px' />

      <p>temperature {weather === 'undefined' ? 'loading' : weather.main.temp} Celcius</p>
      <img src={`http://openweathermap.org/img/wn/${weather === 'undefined' ? 'loading' : weather.weather[0].icon}@2x.png`} alt={`${weather === 'undefined' ? 'loading image' : weather.weather[0].description}`}></img>
      <p>wind {weather === 'undefined' ? 'loading' : weather.wind.speed} m/s</p>
    </div>
  )
}

export default CountryInfo;