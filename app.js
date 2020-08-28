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
// const winlossSchema = new mongoose.Schema({
// 	// title: String,
// 	// image: String,
// 	// body: String,
// 	// created: {type: Date, default: Date.now}
// });
// const Winloss = mongoose.model('Winloss', winlossSchema);







// ===============================================================
// ROUTES
// ===============================================================

app.get('/', function(req, res) {
	console.log('GET request to /');
	res.render('index');
});

app.get('/index', function(req, res) {
	console.log('GET request to index');
	res.render('index');
});

app.get('/members', function(req, res) {
	console.log('GET request to members');
	res.render('members');
});

app.get('/winloss', function(req, res) {
	console.log('GET request to Winloss');
	res.render('winloss');
});

// ===============================================================
// NEW ROUTES
// ===============================================================

app.get('/newwinloss', function(req, res) {
	console.log('GET request to newwinloss');
	res.render('newwinloss');
})

app.post('/winloss', function(req, res) {
	console.log('POST request to winloss');
	res.redirect('winloss');
	// req.body.blog.body = req.sanitize(req.body.blog.body);
	// Winloss.create(req.body.winloss, function(err, newBlog){
	// 	if(err){
	// 		console.log('error');
	// 		res.render('new');
	// 	} else {
	// 		res.redirect('/winloss');
	// 	}
	// })
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









