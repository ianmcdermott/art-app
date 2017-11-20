const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config');

const createAuthToken = user => {
	return jwt.sign({user}, config.JWT_SECRET, {
		subject: user.username,
		expiresIn: config.JWT_EXPIRY,
		algorithm: 'HS256'
	})
}

//exchange user/pass for jwt
router.post('/login', 
	passport.authenticate('basic', {session: false}),
	(req, res) => {
		const authToken = createAuthToken(req.user.apiRepr());
		res.json({authToken});
	})

//refresh jwt
router.post('/refresh',
	passport.authenticate('jwt', {session: false}),
	(req, res) => {
		const authToken = createAuthToken(req.user);
		res.json({authToken});
	}
);

module.exports = {router}