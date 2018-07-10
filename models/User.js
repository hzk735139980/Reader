const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//define our model
const userSchema = new Schema({
    username: { type: String, unique: true, lowercase: true }, //unique username
    password: String,
    bgcolor: { type: String, default: '#FFFFFF'},
    fontsize: { type: String, default: '16px'}
});

//before save to db, encrpyt the password
userSchema.pre('save', function(next){
    // get access to the user model
    const user = this;

    bcrypt.genSalt(10, function(err, salt){
        if(err) { return next(err); }

        bcrypt.hash(user.password, salt, null, function(err, hash){
            if(err) { return next(err); }
            
            user.password = hash;
            next();
        });
    });
});


mongoose.model('user', userSchema);