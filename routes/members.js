const express = require('express');
const router = express.Router();
const Winloss = require('../models/winlossModule');
const User = require('../models/user');
const Character = require('../models/character');


router.get('/', async function(req, res) {
	const currentUser = req.user;
	const winlosses = await Winloss.find({});
	const users = await User.find({});
	res.render('members', { winlosses, currentUser, users });		
	console.log('GET request to members(/user)');
});
router.get('/:id', async function(req, res) {
	const currentUser = req.user;
	const winlosses = await Winloss.find({});
	const user = await User.findById(req.params.id);
	const toons = await Character.find({});
	res.render('userPublic', { winlosses, currentUser, user, toons });			
	console.log('GET request to members/:id ');
});


module.exports = router;