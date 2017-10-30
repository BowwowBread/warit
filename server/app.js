import express from 'express'
import mongoose from 'mongoose'
import bodyparser from 'body-parser'
import cors from 'cors'
import path from 'path'
import passport from 'passport'
import session from 'express-session'
import cookie from 'cookie-parser'
import flash from 'connect-flash'
import http from 'http';
import https from 'https';
import httpsRedrect from 'express-https-redirect';
import fs from 'fs';

var app = express()
var client = express()

import api from './routes/index'
import config from './config/auth/config'


/**
 * config mongodb
 */

//connect to mongodb
mongoose.Promise = global.Promise
// mongoose.connection.openUri('mongodb://Admin:1004@localhost:27017/warit')
mongoose.connection.openUri('mongodb://Admin:1004@localhost:27017/warit')


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
app.use(bodyparser.urlencoded({
  extended: false
}));
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



//routes
app.use('/api', api)



//port no
const client_port = 3000
const api_port = 3001
if (process.env.NODE_ENV == "development") {
  console.log('development env started :')
  app.listen(api_port, () => {
    console.log('api server start on port 3001');
  });
} else {
    console.log('production env started :')
  client.use(express.static(path.join(__dirname, '../public')))
  client.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
  const options = {
    key: fs.readFileSync('./keys/private.pem'),
    cert: fs.readFileSync('./keys/public.pem')
  };
  https.createServer(options, client).listen(client_port, () => {
    console.log('client server start on port 3000');
  });
  https.createServer(options, app).listen(api_port, () => {
    console.log('api server start on port 3001');
  });
}