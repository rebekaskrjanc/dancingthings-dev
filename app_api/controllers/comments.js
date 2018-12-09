'use strict';
var mongoose = require('mongoose');
var Post = mongoose.model('Post');

var vrniJsonOdgovor = function(res, status, data) {
  res.status(status);
  res.json(data);
};

module.exports.createComment = function(req, res) {
  var idPost = req.params.postId;
  if (idPost) {
		Post
			.findById(idPost)
			.select('comments')
			.exec(
				function(error, post) {
					if(error) {
						vrniJsonOdgovor(res, 400, error);
					} else {
						addComment(req, res, post);
					}
				}
			);
	} else {
		vrniJsonOdgovor(odgovor, 400, {
      "sporočilo": 
        "Ne najdem posta, postId je obvezen parameter."
    });
	}
};

var addComment = function(req, res, post) {
	if (!post) {
		vrniJsonOdgovor(res, 404, {
      "sporočilo": "Ne najdem lokacije."
    });
	}	else {
		post.comments.push({
			commentAuthor: req.body.author,
			commentText: req.body.commentText
		});
		post.save(function(error, post) {
			var addedComment;
			if(error) {
				vrniJsonOdgovor(res, 400, error);
			} else {
				addedComment = post.comments[post.comments.length - 1]
				vrniJsonOdgovor(res, 201, addedComment);
			}
		});
	}
};