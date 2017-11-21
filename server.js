'use strict';
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const mongoose = require('mongoose');

const {router: usersRouter} = require('./users')
const {router: authRouter, localStrategy, jwtStrategy} = require('./auth')

mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');

const app = express();

app.use(express.static('public'));

app.use(morgan('common'));

app.use(function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
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

function runServer(){
	const port = process.env.PORT || 8080;
	return new Promise((res, rej) =>{
		server = app.listen(port, () =>{
			console.log(`listening on port ${port}`);
			res(server);
		})
		.on('error', e => {
			rej(e);
		});
	});
}

function closeServer(){
	return new Promise((res, rej) =>{
		console.log('closing server');
		server.close(e => {
			if(e){
				console.log('erroring');
				rej(e);
				return;
			}
			res();
		});
	});
}

if(require.main === module){
	runServer().catch(e => console.error(e));
};

module.exports = {app, runServer, closeServer};
