import CountryInfo from './CountryInfo';

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

export default Display;