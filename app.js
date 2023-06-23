var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var authInterceptor = require('./services/authInterceptor');

var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var authenticateRouter = require('./routes/authenticate');
var profileRouter = require('./routes/profile');
var visitorRouter = require('./routes/visitor');
var otprouter = require('./routes/otp');
var reportrouter = require('./routes/report')
var chatrouter = require('./routes/chat');
var documentrouter = require('./routes/document');

var app = express();

app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('uploads'));
app.use(cors());
// app.use('/', authInterceptor);

app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/authenticate', authenticateRouter);
app.use('/profile',profileRouter);
app.use('/visitor',visitorRouter);
app.use('/otp', otprouter);
app.use('/report',reportrouter);
app.use('/chat',chatrouter);
app.use('/document',documentrouter);

module.exports = app;
