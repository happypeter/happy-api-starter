const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const morgan = require('morgan')

app.use(cors())
app.use(morgan('tiny'))

// mongoose START
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/dbname')
const db = mongoose.connection
db.on('error', () => console.error('Mongo Failed to Connect!!!!'))
db.on('connected', () => console.log('Mongo Connected'))
// mongoose END

app.use(express.static(path.join(__dirname, 'public')))
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const routes = require('./routes')
routes(app)

const { port } = require('./config')

app.listen(port, () => {
  console.log(`running on port ${port}`)
})
