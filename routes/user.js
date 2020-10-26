const express = require('express');
const router = express.Router();
const Winloss = require('../models/winlossModule');
const User = require('../models/user');
const Character = require('../models/character');
const methodOverride = require('method-override');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });


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

router.put('/:_id', isLoggedIn, upload.single('Image'), async function(req, res){
	console.log(req.body);
	const filter = { _id: req.user._id}
	let user = await User.findOne(filter);
	await User.updateOne(filter, req.body);
	await user.save();
	console.log('PUT request to user/:id');
	res.redirect('/user');
});

router.get('/:id/edit',isLoggedIn, async function(req, res){	
	const currentUser = req.user;
	const winlosses = await Winloss.find({});
	const user = await User.findById(req.params.id);
	const toons = await Character.find({});
	res.render('useredit', { winlosses, currentUser, user, toons });	
	console.log('GET request to user/edit');
});


module.exports = router;