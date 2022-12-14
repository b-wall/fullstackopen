const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(err => logger.error('error connecting to MongoDB:', err.message))

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

// Routes

app.use('/api/blogs', blogsRouter)

app.use(middleware.requestLogger)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)



module.exports = app