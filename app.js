const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();

//DB Setup
mongoose.connect('mongodb://localhost:27017/auth', { useNewUrlParser: true });

// app.set('view engine', 'ejs');

app.use(morgan('combined'));
// parse application/json
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));
require('./routes/indexRoute')(app);
require('./routes/authRoute')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);