var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var authInterceptor = require('./services/authInterceptor');
var cron = require('node-cron');
var Path = require('path');

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
var cronJobs = require("./routes/cron");

var app = express();

const publicPath = Path.join(__dirname, 'public');
app.use(express.static(publicPath));

app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
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

// Schedule a cron job to run the task at a specific interval (every hour in this example)
cron.schedule('0 * * * *', () => {
    console.log('Running cron job...');
    cronJobs.fetchDisabledFilePaths((err, dbFiles) => {
        if (err) {
            console.error('Error fetching file paths from database:', err);
        } else {
            cronJobs.deleteFilesNotInDB(dbFiles, 'uploads');
        }
    });
});

module.exports = app;
