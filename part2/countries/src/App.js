import { useState, useEffect } from 'react'
import axios from 'axios'

const Display = ({ query, countries }) => {
  const searchTerm = countries.filter(country => country.name.toLowerCase().includes(query.toLowerCase())).map(country => <p key={country.alpha3Code}>{country.name}</p>);
  if (searchTerm.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  else if (searchTerm.length === 1) {
    const filteredCountry = countries.filter(country => country.alpha3Code === searchTerm[0].key)
    return (
      <div>
        <h1>{filteredCountry[0].name}</h1>
        <p>Capital: {filteredCountry[0].capital}</p>
        <p>Area: {filteredCountry[0].area}</p>
        
        <p><strong>Languages:</strong></p>
        <ul>
          {filteredCountry[0].languages.map(language => <li>{language.name}</li>)}
        </ul>
        <img src={filteredCountry[0].flag} alt={`${filteredCountry[0].name}'s flag`} height='170px'/>
      </div>
    )
  }
  return (searchTerm)
}

const App = () => {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get('https://restcountries.com/v2/all')
      .then(response => {
        setCountries(response.data);
    })
  }, [])

  const handleQuery = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  }

  return (
    <div>
      <p>find countries<input value={query} onChange={handleQuery} /></p>
      <Display query={query} countries={countries} />
    </div>
  )
}

export default App