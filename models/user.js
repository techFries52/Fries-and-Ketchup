const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true},
    password: String,
    email: { type: String, unique: true, required: true},
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    image: 
        {
        path: String,
        filename: String
        }
    ,
    created: {type: Date, default: Date.now}
});

var options = {
    errorMessages: {
        UserExistsError: 'Email already exists',
        IncorrectUsernameError: 'Email does not exist',
        IncorrectPasswordError: 'Incorrect Password'
    }
};

UserSchema.plugin(passportLocalMongoose, options);

module.exports = mongoose.model('User', UserSchema);