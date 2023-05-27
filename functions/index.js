const express = require("express");
const functions = require("firebase-functions");
const app = express();

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const usersRouter = require('../routes/users');
const loginRouter = require('../routes/login');
const signupRouter = require('../routes/signup');
const authenticateRouter = require('../routes/authenticate');
const profileRouter = require('../routes/profile');
const visitorRouter = require('../routes/visitor');

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

exports.app = functions.https.onRequest(app);
