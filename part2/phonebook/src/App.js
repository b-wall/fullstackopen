import { useState, useEffect } from 'react';

import contactsService from './services/contacts';

const Notification = ({ message, messageClass }) => {
  if (message == null) {
    return null
  }

  return (
    <div className={messageClass}>
      {message}
    </div>
  )
}

const DeleteBtn = ({ person, persons, setPersons, message, messageClass, setMessage, setMessageClass}) => {
  const deleteContact = (e) => {
    e.preventDefault();
    const confirm = window.confirm(`are you sure you wish to delete ${person.name}?`);
    if (confirm) {
      contactsService.deleteItem(person);
      setMessageClass('error');
      setMessage(`${person.name} has been deleted`);
      setTimeout(() => {
        setMessageClass(null);
        setMessage(null);
      }, 5000);
      setPersons(current => current.filter(persons => {
      return persons.id !== person.id;
    }))
    }
  };
  return (
    <button onClick={deleteContact}>delete</button>
  )
}

const Persons = ({ persons, query, setPersons, message, messageClass, setMessage, setMessageClass }) => {
  return (
    <div>
      {persons.filter(person => person.name.toLowerCase().includes(query.toLowerCase())).map(person => <p className='contact' key={person.id}>  {person.name} {person.number} <DeleteBtn person={person} persons={persons} setPersons={setPersons} message={message} messageClass={messageClass} setMessage={setMessage} setMessageClass={setMessageClass} /></p>)}
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
  const [message, setMessage] = useState(null)
  const [messageClass, setMessageClass] = useState(null)

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  };

  const addContact = (e) => {
    e.preventDefault();
    if (persons.find(person => person.name.toLowerCase() === newName.toLowerCase())) {
      const confirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      if (confirm) {
        const existingPerson = persons.filter(person => person.name.toLowerCase() === newName.toLowerCase());
        existingPerson[0].number = newNumber;
        contactsService.updateItem(existingPerson[0])
        .catch(error => {
          setMessageClass('error');
          setMessage(`Error: ${existingPerson[0].name} has already been deleted`);
          setTimeout(() => {
            setMessage(null);
            setMessageClass(null);
          }, 5000);
          return
        });
      }
      setMessageClass('success');
      setMessage(`Edited ${newName} successfully`);
      setTimeout(() => {
        setMessage(null);
        setMessageClass(null);
      }, 5000);
      setNewName('');
      setNewNumber('');
      return
    }

    const noteObject = {
      name: newName,
      number: newNumber,
      id: (persons.length+1)
    }

    contactsService.create(noteObject).catch(err => {
      setMessageClass('error')
      setMessage(err.response.data.error)
      setNewName('')
      setNewNumber('')
      setTimeout(() => {
        setMessage(null)
        setMessageClass(null)
      }, 5000)
      setPersons(persons.filter(person => person !== noteObject))
      return
    });

    setMessageClass('success');
    setMessage(`Added ${newName} successfully`);
    setTimeout(() => {
      setMessage(null);
      setMessageClass(null);
    }, 5000);
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
      <Notification message={message} messageClass={messageClass}/>
      <h1>Phonebook</h1>
      <Filter query={query} handleSearch={handleSearch} />
      <h2>Add New Number</h2>
      <PersonForm addContact={addContact} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons} query={query} message={message} setMessage={setMessage} messageClass={messageClass} setMessageClass={setMessageClass}/>
    </div>
  )
}

export default App