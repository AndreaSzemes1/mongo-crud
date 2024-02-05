require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');

const auth = require('./routes/auth.routes');
const books = require('./routes/books.routes');
const index = require('./routes/index.routes');
const readingList = require('./routes/readingList.routes');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;


db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

const app = express();
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(flash());

var corsOptions = {
  origin: 'http://localhost:3031',
};

app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.locals.userId = req.session.user?.id || null;
  res.locals.userName = req.session.user?.username || null;
  next();
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', index);
app.use('/', auth);
app.use('/', books);
app.use('/', readingList);

// index route
app.get('/', (req, res) => {
    res.render('index');
});


// set port, listen for requests
app.listen(process.env.PORT, () => {
  console.log(`Server is running`);
});