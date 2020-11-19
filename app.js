if(process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
require('dotenv').config();
const expressSanitizer = require('express-sanitizer')
const mongoSanitize = require('express-mongo-sanitize');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const Winloss = require('./models/winlossModule');
const User = require('./models/user'); 
const multer = require('multer');
const { storage } = require('./cloudinary');
const upload = multer({ storage });
const match = require('./routes/match');
const user = require('./routes/user');
const members = require('./routes/members');
const character = require('./routes/characters');
const catchAsync = require('./utils/catchAsync');
const { deleteOne } = require('./models/winlossModule');
const helmet = require('helmet');
const nodemailer = require('nodemailer');
const crypto = require('crypto')
const async = require('async');
const uri = process.env.URI;
const session = require('express-session');
const { MongoStore } = require('connect-mongo');
const MongoDBStore = require('connect-mongo')(session);
const app = express();

// ===============================================================
// Config
// ===============================================================

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.connection.on('connected', () => {
	console.log('connected to mongoDB');
});
mongoose.connection.on('error' , err => {
	console.log('error connecting to mongodb');
	console.log(err);
});

const store = new MongoDBStore({
	url: uri,
	secret: 'PickleRick',
	touchAfter: 24 * 60 * 60
});

store.on('error', function (e) {
	console.log(e);
})

const sessionConfig = {
	store,
	name: 'session',
	secret: 'PickleRick',
	resave: false,
	saveUninitialized: false,
	cookie: {
		httpOnly: true, 
		expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
		maxAge: 1000 * 60 * 60 * 24 * 7
	}
}
app.use(session(sessionConfig));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public/'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressSanitizer());
app.use(methodOverride('_method'));
app.use(passport.initialize());
app.use(passport.session());
app.use(mongoSanitize());
app.use(helmet({contentSecurityPolicy: false}));


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ===============================================================
// ROUTES
// ===============================================================

app.use('/match', match );
app.use('/user', user );
app.use('/members', members );
app.use('/character', character );


app.get('/', function(req, res) {
	console.log('GET request to /');
	res.redirect('index');
});
app.get('/index', async function(req, res) {
	const currentUser = req.user;
	const winlosses = await Winloss.find({});
	const user = await User.find({});
	res.render('index', { winlosses, currentUser, user });	
	console.log('GET request to index');
});

app.get('/register', async function(req, res) {
	const currentUser = req.user;
	const winlosses = await Winloss.find({});	
	res.render('register', { winlosses, currentUser });	
	console.log('GET request to register');
});

app.post('/register', upload.single('Image'), function(req, res){	
	const currentUser = req.user;
	User.register(new User({ username: req.body.username, email: req.body.email, image: req.file }), req.body.password, function(err, user) {
		if(err) {
			console.log(err);
			return res.render('error', {err, currentUser});
		} else {
			passport.authenticate("local")(req, res, function(){
				res.redirect("/user"); 
			 });
		};
	});
	console.log('POST request to register');
})

app.get('/login', function(req, res) {
	res.render('login', {currentUser: req.user});
});

app.post('/login', passport.authenticate('local', {
	successRedirect: '/user',
	failureRedirect: '/login-failure'
}), (err, user, options) => {
	console.log(options)
}); 

app.post('/forgot', isLoggedIn, function(req, res, next) {
	async.waterfall([
	  function(done) {
		crypto.randomBytes(20, function(err, buf) {
		  var token = buf.toString('hex');
		  done(err, token);
		});
	  },
	  function(token, done) {
		console.log(req.body.email);
		User.findById({ _id: req.user._id }, function(err, user) {
		  if (!user) {
			console.log(user);
			return res.redirect('/forgot');
		  }
  
		  user.resetPasswordToken = token;
		  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  
		  user.save(function(err) {
			done(err, token, user);
		  });
		});
	  },
	  function(token, user, done) {
		console.log(user);
		var smtpTransport = nodemailer.createTransport({
		  service: 'Gmail', 
		  auth: {
			user: 'FriesandketchupRBG@gmail.com',
			pass: process.env.GMAILPW
		  }
		});
		var mailOptions = {
		  to: user.email,
		  from: 'FriesandketchupRBGo@gmail.com',
		  subject: 'FnK Password Reset',
		  text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
			'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
			'http://' + req.headers.host + '/reset/' + token + '\n\n' +
			'If you did not request this, please ignore this email and your password will remain unchanged.\n'
		};
		smtpTransport.sendMail(mailOptions, function(err) {
		  console.log('mail sent');
		  done(err, 'done');
		});
	  }
	], function(err) {
	  if (err) return next(err);
	  res.redirect('/login');
	});
  });
  
  app.get('/reset/:token', function(req, res) {
	const currentUser = req.user;
	User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
	  if (!user) {
		return res.redirect('/forgot');
	  }
	  res.render('reset', {token: req.params.token, currentUser});
	});
  });
  
  app.post('/reset/:token', function(req, res) {
	async.waterfall([
	  function(done) {
		User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
		  if (!user) {
			return res.redirect('back');
		  }
		  if(req.body.password === req.body.confirm) {
			user.setPassword(req.body.password, function(err) {
			  user.resetPasswordToken = undefined;
			  user.resetPasswordExpires = undefined;
  
			  user.save(function(err) {
				req.logIn(user, function(err) {
				  done(err, user);
				});
			  });
			})
		  } else {
			  return res.redirect('back');
		  }
		});
	  },
	  function(user, done) {
		var smtpTransport = nodemailer.createTransport({
		  service: 'Gmail', 
		  auth: {
			user: 'friesandketchuprbg@gmail.com',
			pass: process.env.GMAILPW
		  }
		});
		var mailOptions = {
		  to: user.email,
		  from: 'friesandketchuprbg@mail.com',
		  subject: 'Your password has been changed',
		  text: 'Hello,\n\n' +
			'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
		};
		smtpTransport.sendMail(mailOptions, function(err) {
		 done(err);
		});
	  }
	], function(err) {
	  res.redirect('/user');
	});
  });

app.get('/login-failure', function(req, res) {
	const currentUser = req.user;
	res.render('login-failure', {currentUser});
});

app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/index');
});

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}
app.get('/error', function(req, res) {	
	const currentUser = req.user;
	res.render('error', {currentUser});
})

app.use((err, req, res, next) => {
	console.dir(err);
	next(err);
})

app.use(async function(err, req, res, next){
	console.log('**try hard')
	const currentUser = req.user;
	const winlosses = await Winloss.find({});
	const user = await User.find({});
	res.render('error', { winlosses, currentUser, user, err });
});

app.listen(process.env.PORT || 3000, process.env.IP, function() {
	console.log('I am listening');
});









