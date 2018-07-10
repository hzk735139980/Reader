//save user bookmarks and customer setting
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('user');

const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
    
    //add user bookmark
    // app.post('/api/bookmark/add', requireAuth, function(req, res){
    //     const bookmark = req.body.bookmark;
    //     const description = req.body.description;

    //     var tmp = { bookurl: bookmark, description: description };
    //     User.findOneAndUpdate({ _id: req.user._id },
    //         { $push: {bookmarks: tmp } }).exec()
    //         .then((user) => res.send(user))
    //         .catch((err) => res.send({ error: 'Something wrong updating the bookmarks'}))
    // });

};