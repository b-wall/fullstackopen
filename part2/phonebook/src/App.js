import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
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
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      setNewName('');
      return
    }
    const noteObject = {
      name: newName,
      number: newNumber,
      id: (persons.length+1)
    }

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