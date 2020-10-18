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

router.get('/',isLoggedIn, async function(req, res){	
	const currentUser = req.user;
	const winlosses = await Winloss.find({});
	const user = await User.findById(req.params.id);
	const toons = await Character.find({});
	res.render('user', { winlosses, currentUser, user, toons });	
	console.log('GET request to user');
});
router.get('/:id/edit',isLoggedIn, async function(req, res){	
	const currentUser = req.user;
	const winlosses = await Winloss.find({});
	const user = await User.findById(req.params.id);
	const toons = await Character.find({});
	res.render('useredit', { winlosses, currentUser, user, toons });	
	console.log('GET request to user/edit');
});
router.put('/', isLoggedIn,  (req, res) => { 
	let user = User.findByIdAndUpdate({username: req.body.username, image: req.file}, function(req, res){
		if(err) {
			console.log(err);
		} else {
			user.save();	
			res.redirect('/user')
		}
	});
		
	
});

module.exports = router;