const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookmarkSchema = new Schema({
    bookurl: String,
    description: String,
    saveDate: String,
    _user: { type: Schema.Types.ObjectId, ref: 'users'}
})

mongoose.model('bookmark', bookmarkSchema);