var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


document.getElementById("gumbDelete").addEventListener("click", DeleteDB);
function DeleteDB() {
	var User = mongoose.model('User');
	var Post = mongoose.model('Post');
	var Group = mongoose.model('Group');
	User.remove({});
	Post.remove({});
	Group.remove({});
}
