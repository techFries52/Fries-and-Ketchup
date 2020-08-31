const expressSanitizer = require('express-sanitizer')
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const express = require('express');
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
app.set('view engine', 'ejs');
// app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride('_method'));



// Allows the use of other JS files
app.use(express.static(__dirname + '/public/'));

// ===============================================================
// Schemas
// ===============================================================
const Winloss = require('./models/winlossModule');








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

app.get('/newwinloss', function(req, res) {
	console.log('GET request to newwinloss');
	res.render('newwinloss');
})

app.get('/winloss', function(req, res) {
	Winloss.find({}, function(err,winlosses){
		if(err) {
			console.log(err);
		} else {
			res.render('winloss', {winlosses: winlosses});
		}
	})
	console.log('GET request to winloss');
	// res.render('winloss');
});

app.get('/user', function(req, res) {
	console.log('GET request to user');
	res.render('user');
});

app.get('/:id', function(req, res) {
	Winloss.findById(req.params.id, function(err, winlosses){
		if(err){
			console.log(err);
		} else {
			res.render('bgshow', {winloss: winlosses});
		}
	})	
})


// ===============================================================
// NEW ROUTES
// ===============================================================



app.post('/winloss', function(req, res) {
	console.log('POST request to winloss');
	// res.redirect('winloss');
	// req.body = req.sanitize(req.body);
	let match = new Winloss(req.body);
	match.save();
	console.log(req.body);
	res.redirect('winloss');
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









app.listen(process.env.PORT || 3000, process.env.IP, function() {
	console.log('I am listening');
});









