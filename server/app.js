import express from 'express';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import cors from 'cors';
import path from 'path';
import passport from 'passport';
import session from 'express-session';
var app = express();

import api from './routes/index';


/**
 * config mongodb
 */

//connect to mongodb
mongoose.Promise = global.Promise;
mongoose.connection.openUri('mongodb://localhost:27017/contacts')

//on connection
mongoose.connection.on('connected', () => {
  console.log('connected @27017');
})

mongoose.connection.on('error', (err) => {
  if (err) {
    console.log('connecteion failed' + err);
  }
})

/**
 * config passport
 */

//serialize
passport.serializeUser(function (user, done) {
  done(null, user);
});

//deserialize
passport.deserializeUser(function (user, done) {
  done(null, user);
})

//port no
const port = 3001;

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

//adding middleware - cors
app.use(cors());

//body -parser
app.use(bodyparser.json());

//static files
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/api', api);

//test server
app.get('/', (req, res) => {
  res.send('bowwow')
})



app.listen(port, () => {
  console.log('Service started at port : ' + port);
});