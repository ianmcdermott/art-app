const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const {app, runServer, closeServer} = require('../server');

//const expect = chai.expect;
const should = chai.should();

const {DATABASE_URL} = require('../config');
const {UserDrawn} = require('../userdrawn/models');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);


function tearDownDB(){
	return new Promise((resolve, reject) => {
		console.warn('Deleting database');
		mongoose.connection.dropDatabase()
			.then(result => resolve(result))
			.catch(err => reject(err))
	});
}

function seedAnimationData(){
	console.info('Seeding database');
	const seedData = [];

	for(let i=1; i<= 10; i++){
		seedData.push({
			id: faker.random.uuid,
			frameNumber: faker.random.number,
  			frame: faker.random.arrayElement,
			title: faker.company.bsNoun(),
			animationId: faker.random.uuid,
			artist: faker.company.bsNoun(),
		    creationDate: faker.date.recent,
		    userId: faker.random.uuid
		});
	}
	return UserDrawn.insertMany(seedData);
}

describe('Userdrawn API resource', function(){

	before(function(){
		return runServer(TEST_DATABASE_URL);
	});

	beforeEach(function(){
		return seedAnimationData();
	});

	afterEach(function(){
		return tearDownDB();
	});

	after(function(){
		return closeServer();
	});

	describe('GET endpoint', function(){
		it('Should retrieve all userdrawn objects', function(){
			let res;
			return chai
				.request(app)
				.get('/userdrawn')
				.then(_res => {
					res = _res;
					res.should.have.status(200);
					res.body.userdrawn.should.have.length.of.at.least(1);
					return UserDrawn.count();
				})
				.then(count =>{
					res.body.userdrawn.should.have.lengthOf(count);
				});
		});

		it('Should retrieve userdrawn objects with right fields', function(){
			let resUserdrawn;
			return chai
				.request(app)
				.get('/userdrawn')
				.then(res => {
					res.should.have.status(200);
					res.should.be.json;
					res.body.userdrawn.should.be.a('array');
					res.body.userdrawn.should.have.length.of.at.least(1);
					res.body.userdrawn.forEach(userdrawn =>{
						userdrawn.should.a('object');
						userdrawn.should.include.keys('id', 'frameNumber', 'frame', 'title', 'animationId', 'artist', 'creationDate', 'userId');
						userdrawn.frameNumber.should.be.a('number');
						userdrawn.frame.should.be.a('array');
						userdrawn.title.should.be.a('string');
						userdrawn.animationId.should.be.a('string');
						userdrawn.artist.should.be.a('string');
						userdrawn.creationDate.should.be.a('string');
						userdrawn.userId.should.be.a('string');

					});
					resUserdrawn = res.body.userdrawn[0];

					return UserDrawn.findById(resUserdrawn.id);
				})
				.then(userdrawn => {
					resUserdrawn.frameNumber.should.equal(userdrawn.frameNumber);	
					resUserdrawn.frame[0].should.equal(userdrawn.frame);		
					resUserdrawn.title.should.equal(userdrawn.title);		
					resUserdrawn.animationId.should.equal(userdrawn.animationId);		
					resUserdrawn.artist.should.equal(userdrawn.artist);		
					resUserdrawn.creationDate.should.equal(userdrawn.creationDate);		
					resUserdrawn.userId.should.equal(userdrawn.userId);		
				});
		});
	});

	describe('POST endpoint', function(){
		it('Should add a new userdrawn', function(){
			const creditArray = [];
			for(let j = 0; j<10; j++){
				creditArray.push(faker.name.firstName + ' ' + faker.name.lastName);
			}

			const newUserdrawn = {
				id: faker.random.uuid,
				frameNumber: faker.random.number,
	  			frame: faker.random.arrayElement,
				title: faker.company.bsNoun(),
				animationId: faker.random.uuid,
				artist: faker.company.bsNoun(),
			    creationDate: faker.date.recent,
			    userId: faker.random.uuid
			}

			return chai.request(app)
				.post('/userdrawn')
				.send(newUserdrawn)
				.then(function(res) {
					res.should.have.status(201);
					res.should.be.json;
					res.body.should.be.a('object');
					res.body.should.include.keys(
						'id', 'frameNumber', 'frame', 'title', 'animationId', 'artist', 'creationDate', 'userId');
					res.body.name.should.equal(newUserdrawn.name);
					res.body.guide.should.equal(newUserdrawn.guide);
					res.body.userDrawn.should.equal(newUserdrawn.userDrawn);
					// res.body.credits.should.equal(newUserdrawn.credits);
					res.body.id.should.not.be.null;
					return UserDrawn.findById(res.body.id);
				})
				.then(function(userdrawn) {
					resUserdrawn.frameNumber.should.equal(userdrawn.frameNumber);	
					resUserdrawn.frame[0].should.equal(userdrawn.frame);		
					resUserdrawn.title.should.equal(userdrawn.title);		
					resUserdrawn.animationId.should.equal(userdrawn.animationId);		
					resUserdrawn.artist.should.equal(userdrawn.artist);		
					resUserdrawn.creationDate.should.equal(userdrawn.creationDate);		
					resUserdrawn.userId.should.equal(userdrawn.userId);		
				});
		});
	});

	describe('PUT endpoint', function(){
		it('should update fields with new data', function(){
			const creditArray = [];

			for(let j = 0; j<10; j++){
				creditArray.push(faker.name.firstName + ' ' + faker.name.lastName);
			}

			const update = {
				id: faker.random.uuid,
				frameNumber: faker.random.number,
	  			frame: faker.random.arrayElement,
				title: faker.company.bsNoun(),
				animationId: faker.random.uuid,
				artist: faker.company.bsNoun(),
			    creationDate: faker.date.recent,
			    userId: faker.random.uuid
			}

			return UserDrawn
				.findOne()
				.then(userdrawn => {
					update.id = userdrawn.id;
					//post the fake data
					return chai
						.request(app)
						.put(`/userdrawn/${userdrawn.id}`)
						.send(update);
				})
				.then(res => {
					res.should.have.status(204);
					return UserDrawn.findById(update.id);
				})
				.then(userdrawn => {
					resUserdrawn.frameNumber.should.equal(userdrawn.frameNumber);	
					resUserdrawn.frame[0].should.equal(userdrawn.frame);		
					resUserdrawn.title.should.equal(userdrawn.title);		
					resUserdrawn.animationId.should.equal(userdrawn.animationId);		
					resUserdrawn.artist.should.equal(userdrawn.artist);		
					resUserdrawn.creationDate.should.equal(userdrawn.creationDate);		
					resUserdrawn.userId.should.equal(userdrawn.userId);		
		});
	});

	describe('DELETE endpoint', function(){
		it('should delete userdrawn by id', function(){
			let userdrawn;

			return UserDrawn
				.findOne()
				.then(_animation => {
					userdrawn = _animation;
					return chai.request(app).delete(`/userdrawn/${userdrawn.id}`);
				})
				.then(res => {
					res.should.have.status(204);
					return UserDrawn.findById(userdrawn.id);
				})
				.then(_animation => {
					should.not.exist(_animation);
				})
		})
	});
})
	})
