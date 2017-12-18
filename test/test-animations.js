const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const {app, runServer, closeServer} = require('../server');

//const expect = chai.expect;
const should = chai.should();

const {DATABASE_URL} = require('../config');
const {Animations} = require('../animations/models');
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
			title: faker.name.firstName(),
		    creationDate: faker.date.past(),
		    frame: '0000'
		});
	}
	return Animations.insertMany(seedData);
}

describe('Animations API resource', function(){

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
		it('Should retrieve all animation objects', function(){
			let res;
			return chai
				.request(app)
				.get('/animations')
				.then(_res => {
					res = _res;
					console.log('Res body is '+ res.body);
					res.should.have.status(200);
					res.body.animations.should.have.length.of.at.least(1);
					return Animations.count();
				})
				.then(count =>{
					res.body.animations.should.have.lengthOf(count);
				});
		});

		it('Should retrieve animations objects with right fields', function(){
			let resAnimation;
			return chai
				.request(app)
				.get('/animations')
				.then(res => {
					res.should.have.status(200);
					res.should.be.json;
					res.body.animations.should.be.a('array');
					res.body.animations.should.have.length.of.at.least(1);
					res.body.animations.forEach(post =>{
						post.should.a('object');
						post.should.include.keys('id', 'title', 'creationDate', 'frame');
					});
					resAnimation = res.body.animations[0];
					return Animations.findById(resAnimation.id);
				})
				.then(animation => {
					resAnimation.title.should.equal(animation.title);
					resAnimation.creationDate.should.equal(animation.creationDate);
					resAnimation.frame.should.equal(animation.frame);
				});
		});
	});

	describe('POST endpoint', function(){
		it('Should add a new animation', function(){
			const newAnimation = {
				title: faker.company.bsNoun(),
			    creationDate: faker.date.past(),
			    frame: '0000'
			}

			return chai.request(app)
				.post('/animations')
				.send(newAnimation)
				.then(function(res) {
					res.should.have.status(201);
					res.should.be.json;
					res.body.should.be.a('object');
					res.body.should.include.keys(
						'id', 'title', 'creationDate', 'frame');
					res.body.title.should.equal(newAnimation.title);
					//res.body.creationDate.should.equal(newAnimation.creationDate);
					res.body.frame.should.equal(newAnimation.frame);
					res.body.id.should.not.be.null;
					return Animations.findById(res.body.id);
				})
				.then(function(animation) {
					animation.title.should.equal(newAnimation.title);
				//	animation.creationDate.should.equal(newAnimate.creationDate);
					animation.frame.should.equal(newAnimation.frame)
				});
		});
	});

	describe('PUT endpoint', function(){
		it('should update fields with new data', function(){
			const update = {
				title: "Test Title",
			    creationDate: faker.date.past(),
			    frame: '9999'
			};

			return Animations
				.findOne()
				.then(animation => {
					update.id = animation.id;
					//post the fake data
					return chai
						.request(app)
						.put(`/animations/${animation.id}`)
						.send(update);
				})
				.then(res => {
					res.should.have.status(204);
					return Animations.findById(update.id);
				})
				.then(animation => {
					animation.title.should.equal(update.title);
				//	animation.creationDate.should.equal(update.creationDate);
					animation.frame.should.equal(update.frame);
				});
		});
	});

	describe('DELETE endpoint', function(){
		it('should delete animation by id', function(){
			let animation;

			return Animations
				.findOne()
				.then(_animation => {
					animation = _animation;
					return chai.request(app).delete(`/animations/${animation.id}`);
				})
				.then(res => {
					res.should.have.status(204);
					return Animations.findById(animation.id);
				})
				.then(_animation => {
					should.not.exist(_animation);
				})
		})
	});
})