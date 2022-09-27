import { useState, useEffect } from 'react';
import axios from 'axios';

import Display from './components/Display';

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