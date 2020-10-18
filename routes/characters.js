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


router.post('/', isLoggedIn, async function(req, res) {
	let character = new Character(req.body, function(){
		console.log('character created') 
		next();
	});
	await character.save();	
	res.redirect('/user');
})

router.get('/:id', async function(req, res) {	
	const currentUser = req.user;
	const winlosses = await Winloss.find({});
	const user = await User.findById(req.params.id);
	const toon = await Character.findById(req.params.id);
	res.render('character', { winlosses, currentUser, user, toon });		
	console.log('GET request to character/:id ');
});


module.exports = router;
