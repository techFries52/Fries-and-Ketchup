if(process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const expressSanitizer = require('express-sanitizer')
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
const app = express();

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
	res.render('index', { winlosses, currentUser });	
	console.log('GET request to index');
});

app.get('/register', async function(req, res) {
	const currentUser = req.user;
	const winlosses = await Winloss.find({});	
	res.render('register', { winlosses, currentUser });	
	console.log('GET request to register');
});

app.post('/register', upload.single('Image'), function(req, res){		
	User.register(new User({ username: req.body.username, image: req.file }), req.body.password, function(err, user) {
		if(err) {
			console.log(err);
			return res.redirect('register', {currentUser: req.user});
		} else {
			passport.authenticate('local')(req,res, function(){
				res.redirect('login');
				console.log(user);
			});
		};
	});
	console.log('POST request to user');
})

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









