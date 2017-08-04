const path = require('path');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

if (process.env.BRIQ_BASE_URL) {
  require('briq-api').Client.BASE_URL = process.env.BRIQ_BASE_URL; // eslint-disable-line global-require
}

const app = express();

app.set('trust proxy', true);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.locals.basedir = path.join(__dirname, 'views');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('connect-assets')({
  paths: [path.join(__dirname, 'assets', 'css')]
}));

app.use('/', require('./routes/index'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
