const mongoose = require('mongoose');


const winlossSchema = new mongoose.Schema({
	// title: String,
	// image: String,
	// body: String,
	// created: {type: Date, default: Date.now}
});
const Winloss = mongoose.model('Winloss', winlossSchema);

module.exports = mongoose.model('Winloss', winlossSchema);