'use strict';
var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
  commentText: {type: String, required: true},
});

var postSchema = new mongoose.Schema({
  text: {type: String, required: true},
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  comments: [commentSchema],
  createdAt: {type: Date, "default": Date.now}
});

mongoose.model('Post', postSchema, 'Posts');