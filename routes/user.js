const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const Winloss = require('../models/winlossModule');
const User = require('../models/user');
const Character = require('../models/character');
const methodOverride = require('method-override');
const multer = require('multer');
const { storage } = require('../cloudinary');
const cloudinary = require('../cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const upload = multer({ storage });
const catchAsync = require('../utils/catchAsync');


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

router.get('/pedit', isLoggedIn, async function(req, res) {
	const currentUser = req.user;
	const winlosses = await Winloss.find({});
	const user = await User.findById(req.params.id);
	const toons = await Character.find({});
	res.render('pedit', { winlosses, currentUser, user, toons });	
	console.log('GET request to pedit');
});

router.put('/:_id', isLoggedIn, upload.single('Image'), catchAsync(async (req, res) =>{
	const filter = { _id: req.user._id}
	const image = { image: req.file };
	const user = await User.findOne(filter);
	const file = req.user.image.path;
	const path = file.slice(62, 88);
	delimages(path);	
	await User.updateOne(filter, image);
	await User.updateOne(filter, req.body);
	await user.save();
	console.log('PUT request to user/:id');
	res.redirect('/user');
}));

router.put('/:id/pedit', isLoggedIn, catchAsync(async (req, res) => {
	console.log(req.body);
	const op = req.body.oldpassword;
	const np = req.body.newpassword;
	const user = await User.findById(req.user._id);
	user.changePassword(op, np);
	user.save();
	res.redirect('/user');
}));

router.get('/:id/edit',isLoggedIn, async function(req, res){	
	const currentUser = req.user;
	const winlosses = await Winloss.find({});
	const user = await User.findById(req.params.id);
	const toons = await Character.find({});
	res.render('useredit', { winlosses, currentUser, user, toons });	
	console.log('GET request to user/edit');
});


function delimages(x) {
	cloudinary.cloudinary.uploader.destroy( x, function(error,result) {
		console.log(result, error)
	});
}

module.exports = router;