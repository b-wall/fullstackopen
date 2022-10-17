import { useState, useEffect } from 'react';

import contactsService from './services/contacts';

const DeleteBtn = ({ person, persons, setPersons }) => {
  const deleteContact = (e) => {
    e.preventDefault();
    window.confirm(`are you sure you wish to delete ${person.name}?`);
    contactsService.deleteItem(person);
    setPersons(current => current.filter(persons => {
      return persons.id !== person.id;
    }))
  };
  return (
    <button onClick={deleteContact}>delete</button>
  )
}

const Persons = ({ persons, query, setPersons }) => {
  return (
    <div>
      {persons.filter(person => person.name.toLowerCase().includes(query.toLowerCase())).map(person => <p key={person.id}>  {person.name} {person.number} <DeleteBtn person={person} persons={persons} setPersons={setPersons} /></p>)}
    </div>
  )
}

const Filter = ({ query, handleSearch }) => {
  return (
    <p>filter shown with <input value={query} onChange={handleSearch} /></p>
  )
}

const PersonForm = ({ addContact, newName, newNumber, handleNameChange, handleNumberChange}) => {
  return (
    <form onSubmit={addContact}>
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
    contactsService.getAll()
    .then(initialContacts => setPersons(initialContacts))
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

  const addContact = (e) => {
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

    contactsService.create(noteObject)

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
      <PersonForm addContact={addContact} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons} query={query} />
    </div>
  )
}

export default App