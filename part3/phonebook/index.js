require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(express.static('build'));



const Person = require('./models/person')

app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => {
    response.json(people);
  })
  .catch(err => next(err))
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
  .catch(err => next(err))
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(err => next(err))
});

app.post('/api/persons/', (request, response, next) => {
  const body = request.body;
  if(body.name === undefined || body.number === undefined) {
    return response.status(400).json({error: 'content missing'})
  }

  const person = new Person({
    "name": body.name,
    "number": body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
});


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'})
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});