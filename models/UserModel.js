var mongoose = require('mongoose');
var crypto = require('crypto'); // Using node built in crypto library for password hashing and salt generation

var UserSchema = new mongoose.Schema({
    username: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    email: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    bio: String,
    image: String,
    hash: String,
    salt: String
}, {timestamps: true});

UserSchema.methods.setPassword = function(password){
      this.salt = crypto.randomBytes(16).toString('hex');
      this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};
    

mongoose.model('User', UserSchema);