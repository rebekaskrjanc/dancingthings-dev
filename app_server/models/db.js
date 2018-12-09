var mongoose = require('mongoose');

var dbURI = 'mongodb://localhost/edugeocache';
mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true });