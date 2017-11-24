'use strict';
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');

const {router: usersRouter} = require('./users')
const {router: authRouter, localStrategy, jwtStrategy} = require('./auth')

mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');

const app = express();

app.use(express.static('public'));

app.use(morgan('common'));

app.use(function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
	if(req.method === 'OPTIONS'){
		return res.send(204);
	}
	next();
});

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/api/users/', usersRouter);
app.use('/api/auth/', authRouter);

const jwtAuth = passport.authenticate('jwt', {session: false});

//use jwt to access endpoint with user data
app.get('/api/protected', jwtAuth, (req, res) =>{
	return res.json({
		data: 'Hello World'
	});
});


app.use('*', (req, res) =>{
	return res.status(404).json({message: 'Not Found'});
});


// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/views/index.html');
// });

let server;

function runServer() {
  return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL, { useMongoClient: true }, err => {
      if (err) {
        return reject(err);
      }
      server = app
        .listen(PORT, () => {
          console.log(`Your app is listening on port ${PORT}`);
          return resolve();
        })
        .on('error', err => {
          mongoose.disconnect();
          return reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    });
  });
}

if(require.main === module){
	runServer().catch(e => console.error(e));
};

module.exports = {app, runServer, closeServer};
