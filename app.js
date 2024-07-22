var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors')
const { WebcastPushConnection } = require('tiktok-live-connector');
const WebSocket = require('ws');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const connectDB = require('./database/connect.db');
require('dotenv').config();
connectDB();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const expressWs = require('express-ws');

var app = express();

expressWs(app);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/', indexRouter);
app.use('/api/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
app.ws('/users/api/tiktokLive', (ws, req) => {

  console.log('New client connected to /users/api/tiktokLive');

  const interval = setInterval(() => {
    const data = {
      message: 'Hello from server',
      avatar: 'https://example.com/avatar.png'
    };
    ws.send(JSON.stringify(data));
  }, 5000);

  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });

  res.render('index', { title: "test" })


});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
