const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/api/contacts')
const HTTP_CODS = require("./helpers/httpCodes")

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)


app.use((_, res) => {
  res
    .status(HTTP_CODS.BAD_REQUEST)
    .json({ message: 'Not found' })
})

app.use((err, _, res, __) => {
  res
    .status(HTTP_CODS.INTERNAL_SERVER_ERROR)
    .json({ message: err.message })
})

module.exports = app
