const express = require('express');
const router = express.Router();
const Winloss = require('../models/winlossModule');
const User = require('../models/user');
const Character = require('../models/character');

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}

router.get('/', async function(req, res) {
	const currentUser = req.user;
	const winlosses = await Winloss.find({});	
	res.render('winloss', { winlosses, currentUser });		
	console.log('GET request to match');	
});

router.post('/',isLoggedIn, async function(req, res) {
	console.log('POST request to match');
	let match = new Winloss(req.body, function(){
		match.user.username = req.user.username;
		match.user.id = req.user._id;
		next();
	});
	await match.save();
	res.redirect('/match');
})

router.get('/new',isLoggedIn, async function(req, res) {
	const currentUser = req.user;
	const winlosses = await Winloss.find({});
	const users = await User.find({});
	const toons = await Character.find({});
	res.render('newwinloss', { winlosses, currentUser, users, toons });	
	console.log('GET request to winloss/new');
})

router.get('/:id', async function(req, res) {
	const currentUser = req.user;
	const winloss = await Winloss.findById(req.params.id);	
	res.render('bgshow', { winloss, currentUser });		
	console.log('GET request to match/:id');
})

module.exports = router;