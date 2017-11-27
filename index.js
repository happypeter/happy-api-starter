const express = require('express')
const app = express()
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan')


app.use(cors())
app.use(morgan('tiny'))

let dbURL = 'mongodb://localhost:27017/yummy'
mongoose.Promise = global.Promise
mongoose.connect(dbURL)
var db = mongoose.connection
db.once('open',function () {
  console.log('mongodb connect success')
})

app.use(express.static(path.join(__dirname, 'public')))

const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

let routes = require('./routes')
routes(app)

app.listen(3008, function(){
  console.log('running on port 3008')
})
