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