'use strict';
var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  commentText: {type: String, required: true},
});

var userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true, dropDups: true},
  password: {type: String, required: true},
  name: {type: String, required: true},
  email: {type: String, unique: true, dropDups: true, required: true},
  state: String,
  gender: {type: String, required: true},
  dance: {type: String, required: true},
  comments: [commentSchema],
});

mongoose.model('User', userSchema, 'Users');