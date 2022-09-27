import { useState, useEffect } from 'react';
import axios from 'axios';

import CountryInfo from './components/CountryInfo';

const Display = ({ query, countries, setQuery }) => {
  const viewCountry = (country) => {
    setQuery(country);
  }

  const searchTerm = countries.filter(country => country.name.toLowerCase().includes(query.toLowerCase())).map(country => <p key={country.alpha3Code}>{country.name} <button onClick={() => viewCountry(country.name)}>show</button></p>);
  if (searchTerm.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  else if (searchTerm.length === 1) {
    const filteredCountry = countries.filter(country => country.alpha3Code === searchTerm[0].key)

    return (
      <div>
        <CountryInfo country={filteredCountry[0]} />
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
      <Display query={query} setQuery={setQuery} countries={countries} />
    </div>
  )
}

export default App