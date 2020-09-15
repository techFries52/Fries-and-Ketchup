const expressSanitizer = require('express-sanitizer')
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const User = require('./models/user');

// ===============================================================
// Config
// ===============================================================

mongoose.connect('mongodb://localhost:27017/Fries-and-Ketchup', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.connection.on('connected', () => {
	console.log('connected to mongoDB');
});
mongoose.connection.on('error' , err => {
	console.log('error connecting to mongodb');
});

app.use(require('express-session')({
	secret: 'PickleRick',
	resave: false,
	saveUninitialized: false
}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public/'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride('_method'));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Allows the use of other JS files
// app.use(express.static(__dirname + '/public/'));

// ===============================================================
// Schemas
// ===============================================================
const Winloss = require('./models/winlossModule');
const { request } = require('express');








// ===============================================================
// ROUTES
// ===============================================================

app.get('/', function(req, res) {
	console.log('GET request to /');
	res.redirect('index');
});

app.get('/index', function(req, res) {
	Winloss.find({}, function(err, winlosses){
		if(err) {
			console.log(err);
		} else {
			res.render('index', {winlosses: winlosses});
		}
	})
	console.log('GET request to index');
});

app.get('/members', function(req, res) {
	console.log('GET request to members');
	res.render('members');
});

// app.get('/newwinloss', function(req, res) {
// 	console.log('GET request to newwinloss');
// 	res.render('newwinloss');
// })

app.get('/user',isLoggedIn, function(req, res) {
	Winloss.find({}, function(err,winlosses){
		if(err) {
			console.log(err);
		} else {
			res.render('user', {winlosses: winlosses});
		}
	})
	console.log('GET request to user');
});

app.get('/register', function(req, res) {
	Winloss.find({}, function(err,winlosses){
		if(err) {
			console.log(err);
		} else {
			res.render('register', {winlosses: winlosses});
		}
	})
	console.log('GET request to register');
});

app.get('/match', function(req, res) {
	Winloss.find({}, function(err,winlosses){
		if(err) {
			console.log(err);
		} else {
			res.render('winloss', {winlosses: winlosses});
		}
	})
	console.log('GET request to match');
	// res.render('winloss');
});

// app.get('/user', function(req, res) {
// 	console.log('GET request to user');
// 	res.render('user');
// });

// app.get('/:id', function(req, res) {
// 	Winloss.findById(req.params.id, function(err, winlosses){
// 		if(err){
// 			console.log(err);
// 		} else {
// 			res.render('bgshow', {winloss: winlosses});
// 		}
// 	})	
// })


// ===============================================================
// NEW ROUTES
// ===============================================================



app.post('/match',isLoggedIn, function(req, res) {
	console.log('POST request to match');
	// res.redirect('winloss');
	// req.body = req.sanitize(req.body);
	let match = new Winloss(req.body);
	match.save();
	res.redirect('match');
})

app.post('/register', function(req, res){
	console.log('POST request to user');
	User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
		if(err) {
			console.log(err);
			return res.render('register');
		} else {
			passport.authenticate('local')(req,res, function(){
				res.redirect('user');
			});
		};
	});
})

app.get('/match/new',isLoggedIn, function(req, res) {
	console.log('GET request to winloss/new');
	res.render('newwinloss');
})

app.get('/match/:id',isLoggedIn, function(req, res) {
	Winloss.findById(req.params.id, function(err, winlosses){
		if(err){
			console.log(err);
		} else {
			console.log('GET request to match/:id');
			res.render('bgshow', {winloss: winlosses});
		}
	})	
})

app.post('/user', function(req, res) {
	console.log('POST request made to user');
	res.render('user');
})


// ===============================================================
// PUT REQUESTS
// ===============================================================



// ===============================================================
// DELETEx REQUESTS
// ===============================================================


app.get('/login', function(req, res) {
	res.render('login');
});

app.post('/login', passport.authenticate('local', {
	successRedirect: '/user',
	failureRedirect: '/index'
}), function(req, res) {

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



app.listen(process.env.PORT || 3000, process.env.IP, function() {
	console.log('I am listening');
});









