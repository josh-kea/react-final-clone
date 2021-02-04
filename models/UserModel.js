var mongoose = require('mongoose');
var crypto = require('crypto'); // Using node built in crypto library for password hashing and salt generation
var jwt = require('jsonwebtoken');
require('dotenv').config()

var UserSchema = new mongoose.Schema({
    email: String,
    hash: String,
    salt: String
}, {timestamps: true});

UserSchema.methods.setPassword = function(password){
      this.salt = crypto.randomBytes(16).toString('hex');
      this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

// generate JsonWebToken on user instance
UserSchema.methods.generateJWT = function() {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        email: this.email,
        exp: parseInt(exp.getTime() / 1000),
        }, process.env.JWT_SECRET);
};

UserSchema.methods.toAuthJSON = function(){
    return {
        email: this.email,
        token: this.generateJWT()
    };
};
    

module.exports = mongoose.model('User', UserSchema);