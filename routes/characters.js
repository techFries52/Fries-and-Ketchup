const express = require('express');
const router = express.Router();
const Winloss = require('../models/winlossModule');
const User = require('../models/user');
const Character = require('../models/character');
const catchAsync = require('../utils/catchAsync');

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}


router.post('/', isLoggedIn, catchAsync(async (req, res) => {
	let character = new Character(req.body, function(){
		console.log('character created') 
		next();
	});
	await character.save();	
	res.redirect('/user');
}));

router.get('/:id', async function(req, res) {	
	const currentUser = req.user;
	const winlosses = await Winloss.find({});
	const user = await User.findById(req.params.id);
	const toon = await Character.findById(req.params.id);
	res.render('character', { winlosses, currentUser, user, toon });		
	console.log('GET request to character/:id ');
});

router.delete("/:id", isLoggedIn, async function(req, res) {
	await Character.findByIdAndDelete(req.params.id);
	console.log(req.params);
	res.redirect('/user');
	console.log('DELETE request to character');
})

module.exports = router;
