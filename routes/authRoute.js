const Authentication = require('../controllers/authentication');
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });


module.exports = (app) => {
    // app.get('/signup', function(req, res){
    //     res.render('signup', { page_name: 'signup', errors: false });
    // });

    // app.get('/profile', requireAuth, function(req, res){
    //     res.render('profile', { page_name: 'signup', errors: false });
    // })
    app.get('/api/current_user', requireAuth, function(req, res){
        res.send(req.user);
    });

    app.put('/api/user/setting', requireAuth, function(req, res){
        const bgcolor = req.body.bgcolor;
        const fontsize = req.body.fontsize;

        User.findByIdAndUpdate(req.user._id, 
            { $set: { bgcolor: bgcolor, fontsize: fontsize} },
            { new: true}, function(err, doc){
                if(err) return res.status(422).send({ error: 'Cannot update'});
                res.send(doc);
            })
    });
    app.post('/api/signin', requireSignin, Authentication.signin);
    app.post('/api/signup', Authentication.signup);
}