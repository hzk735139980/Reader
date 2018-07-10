const jwt = require('jwt-simple');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const keys = require('../config/keys');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, keys.jwtsecret);
}

exports.signin = function(req, res, next){
    res.send({ token: tokenForUser(req.user) });
}


exports.signup = function(req, res, next){
    const username = req.body.username;
    const password = req.body.password;

    if(!username){
        return res.status(422).send({ error: 'You must provide a username! '});
    }
    if(!password){
        return res.status(422).send({ error: 'You must provide a password! '});
    }

    // see if a user with the given email exists
    User.findOne({ username: username }, function(err, existingUser){
      if(err) return next(err);

        //if a user with username does exist, return an error

        if(existingUser){
            return res.status(422).send({ error: 'Username is in use'});
        }
        
        // if a user with username does not exist, create and save user record
        const user = new User({
            username: username,
            password: password
        });
            
        user.save(function(err){
            if(err) { return next(err) };

            //respond to request indicating the user was created
            res.json({ token: tokenForUser(user) });
        })
    })
};