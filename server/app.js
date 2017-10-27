import express from 'express'
import mongoose from 'mongoose'
import bodyparser from 'body-parser'
import cors from 'cors'
import path from 'path'
import passport from 'passport'
import session from 'express-session'
import cookie from 'cookie-parser' 
import flash from 'connect-flash'

var app = express()

import api from './routes/index'
import config from './config/config'


/**
 * config mongodb
 */

//connect to mongodb
mongoose.Promise = global.Promise
mongoose.connection.openUri('mongodb://waritAdmin:1004@localhost:27017/warit')

//on connection
mongoose.connection.on('connected', () => {
  console.log('connected @27017')
})

mongoose.connection.on('error', (err) => {
  if (err) {
    console.log('connecteion failed' + err)
  }
})

/**
 * config passport
 */

//serialize
passport.serializeUser(function (user, done) {
  done(null, user)
})

//deserialize
passport.deserializeUser(function (user, done) {
  done(null, user)
})

//port no
const port = 3000
const api_port = 3001

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static('public'));
app.use(flash())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  path: '/*'
}))

app.use(cookie())
app.set('jwt-secret', config.secret)
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
//adding middleware - cors
app.use(cors())
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  next()
})

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')

  next()
})

//body -parser
app.use(bodyparser.json())

//static files
app.use(express.static(path.join(__dirname, 'public')))

//routes
app.use('/api', api)

//test server
app.get('/', (req, res) => {
  res.send('index')
})

app.listen(port, () => {
  console.log('Service started at port : ' + port)
})