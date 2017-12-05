//sequences router
'use strict'
const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const {Sequences} = require('./models');

const app = express();
router.use(bodyParser.json());


router.get('/', (req, res) => {
		Sequences
		.find()
		.then(sequences => {
			res.json({
				sequences: sequences.map(
					(sequences) => sequences.apiRepr())
			});
		})
		.catch(
			err => {
				console.error(err);
				res.status(500).json({message: 'Internal Server Error'});
		});
});

router.get('/:id', (req, res) =>{
	Sequences
		.findById(req.params.id)
		.then(sequences => res.json(sequences.apiRepr()))
		.catch(err => {
			console.error(err);
			res.status(500).json({message: 'Internal server error'})
		});
});

router.post('/', (req, res) =>{
	const requiredFields = ['title', 'guide', 'userDrawn', 'lastDrawn'];
	for(let i=0; i < requiredFields.length; i++){
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \'${field}\' in request body`
			console.error(message);
			res.status(400).send(message);
		}
	}

	Sequences
		.create({
			title: req.body.title,
			guide: req.body.guide,
			userDrawn: req.body.userDrawn,
			credits: req.body.credits
		})
		.then(
			sequences => res.status(201).json(sequences.apiRepr()))
		.catch(err =>{
			console.error(err);
			res.status(500).json({message: 'Internal server error'});
		});
});

router.put('/:id', (req, res) => {
	if(!(req.params.id && req.body.id && req.params.id === req.body.id)){
		const message = (
			`Request path id (${req.params.id}) and request body id ` +
			`(${req.body.id}) must match`);
		console.error(message);
		return res.status(400).json({message: message});
	}

	const toUpdate = {};
	const updateableFields = ['title', 'guide', 'userDrawn', 'lastDrawn'];

	updateableFields.forEach(field => {
		if(field in req.body){
			toUpdate[field] = req.body[field];
		}
	})

	Sequences
		.findByIdAndUpdate(req.params.id, {$set: toUpdate})
		.then(Sequences => {
			console.log("Updated");
			res.status(204).end();
		})
		.catch(err => res.status(500).json({message: 'Internal server error'}));
});

router.delete('/:id', (req, res) =>{
	Sequences
		.findByIdAndRemove(req.params.id)
		.then(sequences => res.status(204).end())
		.catch(err => res.status(500).json({message: 'Internal server error'}));	
});

router.use('*', function(req, res) {
  res.status(404).json({message: 'Not Found'});
});

module.exports = {router};
