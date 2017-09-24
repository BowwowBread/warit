import express from 'express';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import cors from 'cors';
import path from 'path';
var app = express();

import route from './routes/route';

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
//port no
const port = 3001;

//adding middleware - cors
app.use(cors());

//body -parser
app.use(bodyparser.json());

//static files
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/api', route);

//test server
app.get('/', (req, res) => {
  res.send('bowwow')
})

app.listen(port, () => {
  console.log('Service started at port : ' + port);
});