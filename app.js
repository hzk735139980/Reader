const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();
const keys = require('./config/keys');

//DB Setup
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
require('./models/User');
require('./models/Bookmark');

//passport
require('./services/passport');
// app.set('view engine', 'ejs');

app.use(morgan('combined'));
// parse application/json
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));
require('./routes/indexRoute')(app);
require('./routes/authRoute')(app);
require('./routes/userRoute')(app);


if(process.env.NODE_ENV === 'production'){
    // Express will serve up production assets
    // like our main.js file, or main.css file!
    app.use(express.static('client/build'));

    // Express will serve up the index.html file
    // if it doesn't recongnize the route
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);