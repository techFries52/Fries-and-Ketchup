const mongoose = require('mongoose');



const CharacterSchema = new mongoose.Schema({
        name: String,
        faction: String,
        class: String,
        spec: String,
        Image: {
                path: String,
                filename: String
        },
        user: {
                id: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "User"
                },
                username: String
        }
});


const Character = mongoose.model('Character', CharacterSchema);
module.exports = mongoose.model('Character', CharacterSchema);