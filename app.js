const expressSanitizer = require('express-sanitizer')
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const { request } = require('express');
const cors = require('cors');
// ===============================================================
// Schemas
// ===============================================================
const Winloss = require('./models/winlossModule');
const team = require('./models/team');
const User = require('./models/user');
const fs = require('fs'); 
const path = require('path'); 
const multer = require('multer');

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

const storage = multer.diskStorage({ 
    destination: "/uploads",
    filename: (req, file, cb) => { 
		cb(null, file.fieldname + '-' + Date.now() + 
		path.extname(file.originalname));
    } 
}); 
  
const upload = multer({ storage: storage }).single("propic"); 

// Docker
// mongoose.connect('mongodb://mongo:27017/Fries-and-Ketchup', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
// mongoose.connection.on('connected', () => {
// 	console.log('connected to mongoDB');
// });
// mongoose.connection.on('error' , err => {
// 	console.log('error connecting to mongodb');
// });

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
			res.render('index', {winlosses: winlosses, currentUser: req.user});
		}
	})
	
	console.log('GET request to index');
});

app.get('/members', function(req, res) {
	Winloss.find({}, function(err,winlosses){
		if(err) {
			console.log(err);
		} else {
			User.find({}, function(err,users){
				if(err){
					console.log(err)
				} else {
					res.render('members', {winlosses: winlosses, currentUser: req.user, users: users});
				}
			})
		}
	})
	console.log('GET request to members(/user)');
});

// app.get('/newwinloss', function(req, res) {
// 	console.log('GET request to newwinloss');
// 	res.render('newwinloss');
// })


app.get('/user',isLoggedIn, function(req, res){
	User.findById(req.params.id, function(err, user){
		if (err) {
			console.log(err);
		} else {
			Winloss.find({}, function(err,winlosses){
				if(err) {
					console.log(err);
				} else {
					res.render('user', {winlosses: winlosses, currentUser: req.user});
				}
			})
		}
	})	
	console.log('GET request to user');
});


app.get('/user/:id', function(req, res) {	
	User.findById(req.params.id, function(err,users){
		if (err) {
			console.log(err);
		} else {
			Winloss.find({}, function(err,winlosses){
				if(err) {
					console.log(err);
				} else {
					res.render('userPublic', { user: users, winlosses: winlosses, currentUser: req.user});
				}
			})
			// res.render('userPublic', {user: users, currentUser: req.user});
			// Winloss.find({}, function(err,winlosses){
			// 	if(err) {
			// 		console.log(err);
			// 	} else {
			// 		console.log('req params id: ' +req.params._id)
			// 		res.render('userPublic', {winlosses: winlosses, currentUser: req.user, users: users});
			// 	}
			// })
			
		}
	})	
	console.log('GET request to user/:id ');
});

// app.get('/user',isLoggedIn, function(req, res) {
// 	Winloss.find({}, function(err,winlosses){
// 		if(err) {
// 			console.log(err);
// 		} else {
// 			User.find({}, function(err,user){
// 				if(err) {
// 					console.log(err);
// 				} else {
// 					res.render('user', {winlosses: winlosses, currentUser: req.user});
// 				}
// 			})
// 		}
// 	})
	
// 	console.log('GET request to user');
// });

app.get('/register', function(req, res) {
	Winloss.find({}, function(err,winlosses){
		if(err) {
			console.log(err);
		} else {
			res.render('register', {winlosses: winlosses, currentUser: req.user});
		}
	})
	console.log('GET request to register');
});

app.get('/match', function(req, res) {
	Winloss.find({}, function(err,winlosses){
		if(err) {
			console.log(err);
		} else {
			res.render('winloss', {winlosses: winlosses, currentUser: req.user});
		}
	})
	console.log('GET request to match');
	// res.render('winloss');
});




// ===============================================================
// NEW ROUTES
// ===============================================================



app.post('/match',isLoggedIn, function(req, res) {
	console.log('POST request to match');
	// req.body = req.sanitize(req.body);
	let match = new Winloss(req.body, function(){
		match.user.username = req.user.username;
		match.user.id = req.user._id;
		next();
	});
	match.save();
	res.redirect('match');
})

app.post('/register', function(req, res){
	console.log('POST request to user');
	User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
		if(err) {
			console.log(err);
			return res.render('register', {currentUser: req.user});
		} else {
			passport.authenticate('local')(req,res, function(){
				res.redirect('user');
			});
		};
	});
})

app.get('/match/new',isLoggedIn, function(req, res) {
	
	res.render('newwinloss', {currentUser: req.user});
	console.log('GET request to winloss/new');
	console.log(req.user);
})

app.get('/match/:id', function(req, res) {
	Winloss.findById(req.params.id, function(err, winlosses){
		if(err){
			console.log(err);
		} else {
			console.log('GET request to match/:id');
			res.render('bgshow', {winloss: winlosses, currentUser: req.user});
		}
	})	
})




// ===============================================================
// PUT REQUESTS
// ===============================================================


// app.post('/uploads', function(req,res){
// 	upload(req, res, (err) => {
// 		if(err){
// 			console.log(err)
// 		} else {
// 			console.log(req)
// 		}
// 	});
// })
app.post('/user/:id', isLoggedIn, function(req, res) {
	User.findByIdAndUpdate(req.params._id, function(err,users){
		if(err){
			console.log(err)
		} else {
			console.log(req.file)
			res.redirect('user/:id');
		}
	})
	
	console.log('POST request made to user/:id');
	
	// img: { 
	// 	data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)), 
	// 	contentType: 'image/png'
	// } 
})

// ===============================================================
// DELETEx REQUESTS
// ===============================================================


app.get('/login', function(req, res) {
	res.render('login', {currentUser: req.user});
});

app.post('/login', passport.authenticate('local', {
	successRedirect: '/user',
	failureRedirect: '/login'
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









