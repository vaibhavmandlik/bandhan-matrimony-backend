var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var authenticateRouter = require('./routes/authenticate');
var profileRouter = require('./routes/profile');
var visitorRouter = require('./routes/visitor');
var otprouter = require('./routes/otp');

var app = express();

app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('uploads'));
app.use(cors());

app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/authenticate', authenticateRouter);
app.use('/profile',profileRouter);
app.use('/visitor',visitorRouter);
app.use('/otp', otprouter);
app.listen(3000);

module.exports = app;
