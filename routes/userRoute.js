//save user bookmarks and customer setting
const passport = require('passport');
const mongoose = require('mongoose');
const Bookmark = mongoose.model('bookmark');

const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
    
    //get user bookmarks
    app.get('/api/bookmark/fetch', requireAuth, function(req, res){
        Bookmark.find({ _user: req.user._id }, function(err, doc){
            res.send(doc);
        });
    });


    //add user bookmark
    app.post('/api/bookmark/add', requireAuth, function(req, res){
        const bookurl = req.body.bookurl;
        const description = req.body.description;

        const bookmark = new Bookmark({
            bookurl: bookurl,
            description: description,
            _user: req.user._id
        });

        bookmark.save()
        .then(function(result){
            res.json(result);
        });

    });

    //delete user bookmark
    app.delete('/api/bookmark/delete/:id', requireAuth, function(req, res){
        const id = req.body.id;
        
        Bookmark.deleteOne({_id: id}, function(err){
            if(err) return res.status(422).send(err);
            res.sendStatus(200);
        })
    });

    //update user bookmark
    app.post('/api/bookmark/update:id', requireAuth, function(req, res){
        const id = req.body.id;
        const bookurl = req.body.bookurl;
        const description = req.body.description;

        Bookmark.findByIdAndUpdate(id, 
            {$set: {bookurl: bookurl, description: description}}, function(err){
                if(err) return res.status(422).send(err);
                res.sendStatus(200);                
            });
    });

};