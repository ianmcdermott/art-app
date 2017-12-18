const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const {app, runServer, closeServer} = require('../server');

//const expect = chai.expect;
const should = chai.should();

const {DATABASE_URL} = require('../config');
const {Sequences} = require('../sequences/models');
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
	const creditArray = [];

	for(let i=1; i<= 10; i++){
		for(let j = 0; j<10; j++){
			creditArray.push(faker.name.firstName + ' ' + faker.name.lastName);
		}
		seedData.push({
			name: faker.company.bsNoun(),
		    guide: faker.image.imageUrl,
		    userDrawn: faker.image.imageUrl,
		    credits: creditArray
		});
	}
	return Sequences.insertMany(seedData);
}

describe('Sequences API resource', function(){

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
		it('Should retrieve all sequence objects', function(){
			let res;
			return chai
				.request(app)
				.get('/sequences')
				.then(_res => {
					res = _res;
					res.should.have.status(200);
					res.body.sequences.should.have.length.of.at.least(1);
					return Sequences.count();
				})
				.then(count =>{
					res.body.sequences.should.have.lengthOf(count);
				});
		});

		it('Should retrieve sequences objects with right fields', function(){
			let resSequence;
			return chai
				.request(app)
				.get('/sequences')
				.then(res => {
					res.should.have.status(200);
					res.should.be.json;
					res.body.sequences.should.be.a('array');
					res.body.sequences.should.have.length.of.at.least(1);
					res.body.sequences.forEach(sequence =>{
						sequence.should.a('object');
						sequence.should.include.keys('id', 'name', 'guide', 'userDrawn', 'credits');
						sequence.guide.should.be.a('string');
						sequence.userDrawn.should.be.a('string');
						sequence.credits.should.be.a('array');
					});
					resSequence = res.body.sequences[0];

					return Sequences.findById(resSequence.id);
				})
				.then(sequence => {
					resSequence.name.should.equal(sequence.name);		
					resSequence.guide[0].should.equal(sequence.guide[0]);
					resSequence.userDrawn[0].should.equal(sequence.userDrawn[0]);
					resSequence.credits[0].should.equal(sequence.credits[0]);
				});
		});
	});

	describe('POST endpoint', function(){
		it('Should add a new sequence', function(){
			const creditArray = [];
			for(let j = 0; j<10; j++){
				creditArray.push(faker.name.firstName + ' ' + faker.name.lastName);
			}

			const newSequence = {
				name: faker.company.bsNoun(),
			    guide: faker.image.imageUrl,
			    userDrawn: faker.image.imageUrl,
			    credits: creditArray
			}

			return chai.request(app)
				.post('/sequences')
				.send(newSequence)
				.then(function(res) {
					res.should.have.status(201);
					res.should.be.json;
					res.body.should.be.a('object');
					res.body.should.include.keys(
						'id', 'name', 'guide', 'userDrawn', 'credits');
					res.body.name.should.equal(newSequence.name);
					res.body.guide.should.equal(newSequence.guide);
					res.body.userDrawn.should.equal(newSequence.userDrawn);
					// res.body.credits.should.equal(newSequence.credits);
					res.body.id.should.not.be.null;
					return Sequences.findById(res.body.id);
				})
				.then(function(sequence) {
					sequence.name.should.equal(newSequence.name);
					sequence.guide.should.equal(newSequence.guide);
					sequence.userDrawn.should.equal(newSequence.userDrawn);
					// sequence.credits.should.equal(newSequence.credits);
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
				name: faker.company.bsNoun(),
			    guide: faker.image.imageUrl,
			    userDrawn: faker.image.imageUrl,
			    credits: creditArray
			}

			return Sequences
				.findOne()
				.then(sequence => {
					update.id = sequence.id;
					//post the fake data
					return chai
						.request(app)
						.put(`/sequences/${sequence.id}`)
						.send(update);
				})
				.then(res => {
					res.should.have.status(204);
					return Sequences.findById(update.id);
				})
				.then(sequence => {
					sequence.name.should.equal(update.name);
					// sequence.guide.should.equal(update.guide);
					// sequence.userDrawn.should.equal(update.userDrawn);
					// sequence.credits.should.equal(update.credits);
		});
	});

	describe('DELETE endpoint', function(){
		it('should delete sequence by id', function(){
			let sequence;

			return Sequences
				.findOne()
				.then(_animation => {
					sequence = _animation;
					return chai.request(app).delete(`/sequences/${sequence.id}`);
				})
				.then(res => {
					res.should.have.status(204);
					return Sequences.findById(sequence.id);
				})
				.then(_animation => {
					should.not.exist(_animation);
				})
		})
	});
})
	})
