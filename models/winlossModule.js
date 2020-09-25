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
	victory: String,
	defeat: String,
	created: {type: Date, default: Date.now},
	user: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});
const Winloss = mongoose.model('Winloss', winlossSchema);

module.exports = mongoose.model('Winloss', winlossSchema);