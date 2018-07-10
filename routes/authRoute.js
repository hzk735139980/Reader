const Authentication = require('../controllers/authentication');
const passport = require('passport');

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
    })

    app.post('/api/signin', requireSignin, Authentication.signin);
    app.post('/api/signup', Authentication.signup);
}