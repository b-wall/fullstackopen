require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(express.static('build'));



const Person = require('./models/person')

let entries = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => {
    response.json(people);
  })
});

app.get('/info', (request, response) => {
    const entryCount = entries.length;
    const date = new Date();

    response.send(`Phonebook has info for ${entryCount} people <br> ${date}`);
});

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  entries = entries.filter(entry => entry.id !== id);

  response.status(204).end();
});

app.post('/api/persons/', (request, response) => {
  const body = request.body;
  if(body.name === undefined || body.number === undefined) {
    return response.status(400).json({
      error: 'content missing'
    });
  }

  const person = new Person({
    "name": body.name,
    "number": body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
});



const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});