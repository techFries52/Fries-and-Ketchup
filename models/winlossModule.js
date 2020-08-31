const mongoose = require('mongoose');


const winlossSchema = new mongoose.Schema({
	bgs: String,
	ally1: String,
	ally2: String,
	ally3: String,
	ally4: String,
	ally5: String,
	ally6: String,
	ally7: String,
	ally8: String,
	ally9: String,
	ally10: String,
	enemy1: String,
	enemy2: String,
	enemy3: String,
	enemy4: String,
	enemy5: String,
	enemy6: String,
	enemy7: String,
	enemy8: String,
	enemy9: String,
	enemy10: String,
	victory: String,
	defeat: String,
	created: {type: Date, default: Date.now}
});
const Winloss = mongoose.model('Winloss', winlossSchema);

module.exports = mongoose.model('Winloss', winlossSchema);