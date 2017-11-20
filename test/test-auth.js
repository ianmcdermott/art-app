const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

const {app, runServer, closerServer} = require('../server');
const {User} = require('../users');
const {JWT_SECRET} = require('../config');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Auth endpoints', function(){
	const username = 'exampleUser';
	const password = 'examplePass';
	const firstName = 'First';
	const lastName = 'Last';

	before(function(){
		return runServer();
	});

	after(function(){
		return closerServer();
	})

	beforeEach(function(){
		return User.hashPassword(password).then(password =>
			User.create({
				username,
				password,
				firstName,
				lastName
			})
		);
	});

	afterEach(function(){
		return User.remove({});
	});

	describe('/api/auth/login', function(){
		it('Should reject requests with no credentials', function(){
			return chai
				.request(app)
				.post('/api/auth/login')
				.then(()=>
					expect.fail(null, null, 'Request should not succeed')
				)
				.catch
		});

		it('Should reject requests with incorrect username', function(){

		});

		it('Should reject requests with incorrect password', function(){

		});

		it('Should return valid auth token', function(){

		});

	})

	describe('/api/auth/refresh', function(){
		it('Should reject reequests with no credentials', function(){

		});

		it('Should reject requests with invalid auth token', function(){

		});

		it('Should reject requests with expired auth token', function(){
			
		});

		it('Should return valid auth token with newer expiry date', function(){
			
		});
	})
})