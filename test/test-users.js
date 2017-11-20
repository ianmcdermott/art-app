// global.DATABASE_URL = config.DATABASE_URL;
const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

const {app, runServer, closeServer} = require('../server');
const {User} = require('../users');
const {JWT_SECRET, DATABASE_URL} = require('../config');

global.DATABASE_URL = DATABASE_URL;

const expect = chai.expect;

chai.use(chaiHttp);

describe('/api/user' function(){
	const username = 'exampleUser';
	const password = 'examplePass';
	const firstName = 'First';
	const lastName = 'Last';
	const usernameB = 'exampleUserB';
	const passwordB = 'examplePassB';
	const firstNameB = 'FirstB';
	const lastNameB = 'LastB'; 

	before(function(){
		return runServer();
	})
	after(function(){
		return closeServer();
	})

	beforeEach(function(){});

	afterEach(function(){
		return User.remove({});
	});

	describe('/api/users', function(){
		describe('POST', function(){
			it('Should reject users with missing username', function(){
				return chai
					.request(app)
					.post('/api/users')
					.send({
						password,
						firstName,
						lastName
					})
					.then(()=>
						expect.fail(null, null, 'Request should not succeed')
					)
					.catch(err =>{
						if(err instanceof chai.AssertionError){
							throw err;
						}

						const res = err.response;
						expect(res).to.have.status(422);
						expect(res.body.reason).to.equal('ValidationError');
						expect(res.body.message).to.equal('Missing field');
						expect(res.body.location).to.equal('username');
					});
			});
			it('Should reject users with missing password', function(){
				return chai
					.request(app)
					.post('/api/users')
					.send({
						username,
						firstName,
						lastName
					})

			});
			it('Should reject users with non-string username', function(){
				return chai
					.request(app)
					.post('/api/users')
					.send({
						username: 1,
						password,
						firstName,
						lastName
					})
			});

			it('Should reject users with non-string password', function(){
				return chai
					.request(app)
					.post('/api/users')
					.send({
						username,
						password: 1,
						firstName,
						lastName
					})
			});

			it('Should reject users with non-string first name', function(){
				return chai
					.request(app)
					.post('/api/users')
					.send({
						username,
						password,
						firstName 1,
						lastName
					})
			});

			it('Should reject users with non-string last name', function(){
				return chai
					.request(app)
					.post('/api/users')
					.send({
						userName,
						password,
						firstName,
						lastName: 1
					})
			});

			it('Should reject users with trimmable username', function(){
				return chai
					.request(app)
					.post('/api/users')
					.send({
						username: ` ${username} `,
						password,
						firstName,
						lastName
					})

			});

			it('Should reject users with trimmable password', function(){
				return chai
					.request(app)
					.post('/api/users')
					.send({
						username,
						password: ` ${password} `,
						firstName,
						lastName
					})
			});

			it('Should reject users with empty username', function(){
				return chai
					.request(app)
					.post('/api/users')
					.send({
						username: '',
						password,
						firstName,
						lastName
					})

			});

			it('Should reject user with duplicate username', function(){
				return chai
					.request(app)
					.post('/api/users')

			});

			it('Should reject users with password less than 10 char', function(){
				return chai
					.request(app)
					.post('/api/users')
					.send({
						username,
						password: '123456789',
						firstName,
						lastName
					})

			});

			it('Should reject users with password more than 72 char', function(){
				return chai
					.request(app)
					.post('/api/users')
					.send({
						username,
						password: new Array(73).fill('a').join(''),
						firstName,
						lastName
					})
			});

			it('Should create a new user', function(){
				return chai
					.request(app)
					.post('/api/users')
					.send({
						userName,
						password,
						firstName,
						lastName
					})
			});

			it('Should trim first/last names', function(){
				return chai
					.request(app)
					.post('/api/users')
					.send({
						username,
						password,
						firstName: ` ${firstName} `,
						lastName: ` ${lastName} `
					})

			});
		});
		describe('GET', function(){
			it('Should return an empty array initially', function(){
				return chai
					.request(app)
					.get('/api/users').then(res =>{
						expect(res).to.have.status(200);
						expect(res.body).to.be.an('array');
						expect(res.body).to.have.length(0);
					})
			})
			it('Should return an array of users', function(){
				return User.create(
					{	
						username,
						password,
						firstName,
						lastName
					},
					{	
						username: userNameB,
						password: passwordB,
						firstName: FirstB,
						lastName: LastB
					}
				)
				.then(() => chai.request(app).get('api/users'))
				.then(res => {
					expect(res).to.have.status(200);
					expect(res.body).to.be.an('array');
					expect(res.body).to.have.length(2);
					expect(res.body[0]).to.deep.equal({
						username,
						firstName,
						lastName
					});
					expect(res.body[1]).to.deep.equal({
						username: usernameB,
						firstName: firstNameB,
						lastName: lastNameB
					});
				});
			});
		});
	});
});