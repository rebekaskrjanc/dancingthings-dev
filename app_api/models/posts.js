'use strict';
var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  commentAuthor: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  commentText: {type: String, required: true},
});

var postSchema = new mongoose.Schema({
  text: {type: String, required: true},
  postAuthor: {type: mongoose.Schema.Types.ObjectId, ref: 'User',},
  comments: [commentSchema],
  createdAt: {type: Date, "default": Date.now}
});

mongoose.model('Post', postSchema, 'Posts');