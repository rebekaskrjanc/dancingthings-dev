'use strict';
var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  commentAuthor: String,
  commentText: {type: String, required: true},
});

var postSchema = new mongoose.Schema({
  text: {type: String, required: true},
  postAuthor: String,
  comments: [String],
  createdAt: {type: Date, "default": Date.now}
});

mongoose.model('Post', postSchema, 'Posts');