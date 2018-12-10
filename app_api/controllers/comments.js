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
/*
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

module.exports.updateComment = function(req, res) {
  if (!req.params.postId || req.params.commentId) {
    vrniJsonOdgovor(res, 400, error);
    return;
  }  
  Post
    .findById(req.params.postId)
    .select('comments')
    .exec(
      function(error, post) {
        if(!post) {
          vrniJsonOdgovor(res, 404, {
            "sporočilo": 
              "Ne najdem lokacije s podanim enoličnim identifikatorjem postId."
          });
          return;
        } else if(error) {
          vrniJsonOdgovor(res, 500, error);
          return;
        }
        if(post.comments && post.comments.length > 0) {
          comment = post.comments.id(req.params.commentId);
          if(!comment) {
            vrniJsonOdgovor(res, 404, {
              "sporočilo": 
                "Ne najdem komentarja s podanim enoličnim identifikatorjem commentId."
            });
          } else {
            comment.commentAuthor = req.body.author; 
            comment.commentText = req.body.commentText;
            post.save(function(error, post){
              if(error){
                vrniJsonOdgovor(res, 400, error);
              } else {
                vrniJsonOdgovor(res, 200, comment);
              }
            });
          }
        } else {
          vrniJsonOdgovor(res, 404, error);
        }
      }
    );
};
*/