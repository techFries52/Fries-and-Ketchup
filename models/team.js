const mongoose = require('mongoose');


const TeamSchema = new mongoose.Schema({
    ally1: String,
    ally2: String,
    ally3: String,
    ally4: String,
    ally5: String,
    ally6: String,
    ally7: String,
    ally8: String,
    ally9: String,
    ally10: String 
});



module.exports = mongoose.model('Team', TeamSchema);