const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(express.static('build'))

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
    response.json(entries);
});

app.get('/info', (request, response) => {
    const entryCount = entries.length;
    const date = new Date();

    response.send(`Phonebook has info for ${entryCount} people <br> ${date}`);
});

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const entry = entries.find(entry => entry.id === id);

    if(entry) {
        response.json(entry);
    } else {
        response.status(404).end();
    }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  entries = entries.filter(entry => entry.id !== id);

  response.status(204).end();
});

app.post('/api/persons/', (request, response) => {
  const body = request.body;
  if(!body.name || !body.number) {
    return response.status(400).json({
      error: 'content missing'
    });
  }

  const existingName = entries.find(entry => entry.name.toLowerCase() === body.name.toLowerCase());
  if(existingName) {
    return response.status(400).json({
      error: 'name already exists'
    });
  }

  const id = Math.ceil(Math.random() * (100000 - 1) + 1);
  const entry = {
    "id": id,
    "name": body.name,
    "number": body.number
  }

  entries = entries.concat(entry);
  response.json(entry);
});



const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});