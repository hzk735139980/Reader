const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const keys = require('../config/keys');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');

//create local strategy
const localLogin = new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        bcrypt.compare(password, user.password, function(err, res) {
            if (!res) {
                return done(null, false, { message: 'Incorrect password.' });
              }
              return done(null, user);
        });
      });
});

//setup options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: keys.jwtsecret
};

//create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
    //see if the user ID in the payload exists in our datebase
    //if it does, call 'done' with that other
    //otherwise, call done without a user object
    User.findById(payload.sub, function(err, user){
        if(err) { return done(err, false) };

        if(user){
            done(null, user);
        }else{
            done(null, false);
        }
    });
});

//tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);