var mongoose = require('mongoose');
var crypto = require('crypto'); // Using node built in crypto library for password hashing and salt generation
var jwt = require('jsonwebtoken');


const { ObjectId } = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    email: {type: String, unique: true},
    firstName: String,
    lastName: String,
    phone: Number,
    hash: String,
    salt: String,
    verifyString: String,
    isValid: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false }
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
    exp.setDate(today.getDate() + 1);

    return jwt.sign({
        id: this._id,
        email: this.email,
        isAdmin: this.isAdmin,
        exp: parseInt(exp.getTime() / 1000),
        }, process.env.JWT_SECRET);
};

UserSchema.methods.toAuthJSON = function(){
    return {
        email: this.email,
        token: this.generateJWT()
    };
};

UserSchema.methods.generateEmailVerificationString = function(email){
    verifySalt = crypto.randomBytes(2).toString('hex');
    this.verifyString = crypto.pbkdf2Sync(email, verifySalt, 10000, 512, 'sha512').toString('hex');
}
    

module.exports = mongoose.model('User', UserSchema);