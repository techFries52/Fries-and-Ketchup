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
const passportLocalMongoose = require('passport-local-mongoose');
const { request } = require('express');

// ===============================================================
// Schemas
// ===============================================================
const Winloss = require('./models/winlossModule');
const User = require('./models/user');
const Character = require('./models/character');


 
const multer = require('multer');
const { storage } = require('./cloudinary');
const upload = multer({ storage });
const match = require('./routes/match');
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


app.get('/members', async function(req, res) {
	const currentUser = req.user;
	const winlosses = await Winloss.find({});
	const users = await User.find({});
	res.render('members', { winlosses, currentUser, users });		
	console.log('GET request to members(/user)');
});
app.get('/members/:id', async function(req, res) {
	const currentUser = req.user;
	const winlosses = await Winloss.find({});
	const user = await User.findById(req.params.id);
	const toons = await Character.find({});
	res.render('userPublic', { winlosses, currentUser, user, toons });			
	console.log('GET request to members/:id ');
});

app.get('/user',isLoggedIn, async function(req, res){	
	const currentUser = req.user;
	const winlosses = await Winloss.find({});
	const user = await User.findById(req.params.id);
	const toons = await Character.find({});
	res.render('user', { winlosses, currentUser, user, toons });	
	console.log('GET request to user');
});
app.get('/user/edit',isLoggedIn, async function(req, res){	
	const currentUser = req.user;
	const winlosses = await Winloss.find({});
	const user = await User.findById(req.params.id);
	const toons = await Character.find({});
	res.render('useredit', { winlosses, currentUser, user, toons });	
	console.log('GET request to user/edit');
});
app.put('/user', isLoggedIn,  (req, res) => { 
	let user = User.findByIdAndUpdate({username: req.body.username, image: req.file}, function(req, res){
		if(err) {
			console.log(err);
		} else {
			user.save();	
			res.redirect('/user')
		}
	});
		
	
})
app.get('/character/:id', async function(req, res) {	
	const currentUser = req.user;
	const winlosses = await Winloss.find({});
	const user = await User.findById(req.params.id);
	const toon = await Character.findById(req.params.id);
	res.render('character', { winlosses, currentUser, user, toon });		
	console.log('GET request to character/:id ');
	// console.log('GET request to user/character');
});
app.get('/register', async function(req, res) {
	const currentUser = req.user;
	const winlosses = await Winloss.find({});	
	res.render('register', { winlosses, currentUser });	
	console.log('GET request to register');
});




// ===============================================================
// NEW ROUTES
// ===============================================================



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





// ===============================================================
// PUT REQUESTS
// ===============================================================





app.post('/character', isLoggedIn, async function(req, res) {
	let character = new Character(req.body, function(){
		console.log('character created') 
		next();
	});
	await character.save();	
	res.redirect('/user');
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









