var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var uglifyJs = require('uglify-js');
var fs = require('fs');

var zdruzeno = uglifyJs.minify({
  'app.js': fs.readFileSync('app_client/app.js', 'utf-8'),
  'homepage.krmilnik.js': fs.readFileSync('app_client/homepage/homepage.krmilnik.js', 'utf-8'),
  'groups.krmilnik.js': fs.readFileSync('app_client/groups/groups.krmilnik.js', 'utf-8'),
  'members.krmilnik.js': fs.readFileSync('app_client/members/members.krmilnik.js', 'utf-8'),
  //'signup.krmilnik.js': fs.readFileSync('app_client/signup/signup.krmilnik.js', 'utf-8'),
  'komentarModalnoOkno.krmilnik.js': fs.readFileSync('app_client/komentarModalnoOkno/komentarModalnoOkno.krmilnik.js', 'utf-8'),
  'groupModalnoOkno.krmilnik.js': fs.readFileSync('app_client/groupModalnoOkno/groupModalnoOkno.krmilnik.js', 'utf-8'),
  'dancingthingsPodatki.storitev.js': fs.readFileSync('app_client/skupno/storitve/dancingthingsPodatki.storitev.js', 'utf-8'),
  'dancingthingsGroups.storitev.js': fs.readFileSync('app_client/skupno/storitve/dancingthingsGroups.storitev.js', 'utf-8'),
  'dancingthingsMembers.storitev.js': fs.readFileSync('app_client/skupno/storitve/dancingthingsMembers.storitev.js', 'utf-8'),
  'dodajHtmlPrehodVNovoVrstico.filter.js': fs.readFileSync('app_client/skupno/filtri/dodajHtmlPrehodVNovoVrstico.filter.js', 'utf-8'),
  'noga.direktiva.js': fs.readFileSync('app_client/skupno/direktive/noga/noga.direktiva.js', 'utf-8'),
  'navigacija.direktiva.js': fs.readFileSync('app_client/skupno/direktive/navigacija/navigacija.direktiva.js', 'utf-8'),
  'glava.direktiva.js': fs.readFileSync('app_client/skupno/direktive/glava/glava.direktiva.js', 'utf-8')
});

fs.writeFile('public/angular/dancingthings.min.js', zdruzeno.code, function(napaka) {
  if (napaka)
    console.log(napaka);
  else
    console.log('Skripta je zgenerirana in shranjena v "dancingthings.min.js".');
});

require('./app_api/models/db');

//var indexRouter = require('./app_server/routes/index');
var indexApi = require('./app_api/routes/index');

var bodyParser = require("body-parser");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));


//app.use('/', indexRouter);
app.use('/api', indexApi);

app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
