import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (e) => {
    console.log(e.target.value)
    setNewName(e.target.value)
  };

  const addNote = (e) => {
    e.preventDefault();
    const noteObject = {
      name: newName
    }

    setPersons(persons.concat(noteObject));
    setNewName('');
  };

  return (
    <div>
      <div>debug: {newName}</div>
      <h2>Phonebook</h2>
      <form onSubmit={addNote}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
          <p key={person.name}>{person.name}</p>
          )}
      </ul>
    </div>
  )
}

export default App