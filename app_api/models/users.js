'use strict';
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true, dropDups: true},
  password: {type: String, required: true},
  passwordRetype: {type: String, required: true},
  firstname: {type: String, required: true},
  email: {type: String, unique: true, dropDups: true, required: true},
  state: String,
  city: String,
  gender: {type: String},
  dance: {type: String, required: true},
  posts: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Post'} ]
});

mongoose.model('User', userSchema, 'Users');