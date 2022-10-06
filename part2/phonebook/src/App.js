import { useState, useEffect } from 'react';

import axios from 'axios';

const Persons = ({ persons, query }) => {
  return (
    <div>
      {persons.filter(person => person.name.toLowerCase().includes(query.toLowerCase())).map(person => <p key={person.id}>  {person.name} {person.number}</p>)}
    </div>
  )
}

const Filter = ({ query, handleSearch }) => {
  return (
    <p>filter shown with <input value={query} onChange={handleSearch} /></p>
  )
}

const PersonForm = ({ addNote, newName, newNumber, handleNameChange, handleNumberChange}) => {
  return (
    <form onSubmit={addNote}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      })
  }, [])
  


  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  };

  const addNote = (e) => {
    e.preventDefault();
    if (persons.find(person => person.name.toLowerCase() === newName.toLowerCase())) {
      alert(`${newName} is already added to phonebook`);
      setNewName('');
      return
    }
    const noteObject = {
      name: newName,
      number: newNumber,
      id: (persons.length+1)
    }

    axios.post('http://localhost:3001/persons', noteObject)
      .then(response => {
        console.log(response);
    })

    setPersons(persons.concat(noteObject));
    setNewName('');
    setNewNumber('');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter query={query} handleSearch={handleSearch} />
      <h2>Add New Number</h2>
      <PersonForm addNote={addNote} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} query={query} />
    </div>
  )
}

export default App