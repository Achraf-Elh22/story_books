const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const session = require('express-session');
const path = require('path');
const passport = require('passport');
// const MongoStore = require()

const connectDB = require('./config/db');

// Load Config
dotenv.config({ path: './config/config.env' });

// Passport Config
require('./config/passport')(passport);

connectDB();

const app = express();

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Static files
app.use(express.static(path.join(__dirname, '/public')));

// View engine
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// Sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    // store:
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on node ${PORT}`)
);
