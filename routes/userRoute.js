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
            saveDate: createDate(),
            _user: req.user._id
        });

        bookmark.save()
        .then(function(result){
            res.json(result);
        });

    });

    //delete user bookmark
    app.delete('/api/bookmark/delete', requireAuth, function(req, res){
        const id = req.body.id;
        
        Bookmark.findByIdAndRemove(id, function(err){
            if(err) return res.status(422).send(err);
            res.sendStatus(200);
        })
    });

    //update user bookmark
    app.put('/api/bookmark/update', requireAuth, function(req, res){
        const id = req.body.id;
        const bookurl = req.body.bookurl;
        const description = req.body.description;
        
        Bookmark.findByIdAndUpdate(id, 
            {$set: {bookurl: bookurl, description: description, saveDate: createDate()}}, function(err){
                if(err) return res.status(422).send(err);
                res.sendStatus(200);                
            });
    });

};

function createDate(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        var hour = today.getHours();
        var minutes = today.getMinutes();
        if(dd<10) {
            dd = '0'+dd
        } 

        if(mm<10) {
            mm = '0'+mm
        } 

        if(hour<10) {
            hour = '0'+hour
        } 

        if(minutes<10) {
            minutes = '0'+minutes
        } 
        

        today = mm + '/' + dd + '/' + yyyy +',' + hour +':' + minutes;
        return today;
}