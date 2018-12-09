var mongoose = require('mongoose');
var User = mongoose.model('User');
var Post = mongoose.model('Post');

var vrniJsonOdgovor = function(res, status, data) {
  res.status(status);
  res.json(data);
};

module.exports.getPost = function(req, res) {
  if(req.params && req.params.postId) {
    Post
      .findById(req.params.postId)
      .exec(function(error, post){
        if(!post) {
          vrniJsonOdgovor(res, 404,  {
            "sporočilo": 
              "Ne najdem posta s podanim enoličnim identifikatorjem postId."
          });
          return;
        } else if (error) {
          vrniJsonOdgovor(res, 500, error);
          return;
        }
        vrniJsonOdgovor(res, 200, post);
      });
  } else {
    vrniJsonOdgovor(res, 400, { 
      "sporočilo": "Manjka enolični identifikator postId"
    });
  }
};

module.exports.createPost = function(req, res) {
  var userId = req.body.postAuthor;
  req.body.postAuthor = mongoose.Types.ObjectId(req.body.postAuthor);
  Post
    .create(req.body)
    .then(function(post){
      User.updateOne(
        {_id: userId},
        {$push: { posts: post._id}}
      ).then(function(newRes){
        vrniJsonOdgovor(res, 201, post);
      }).catch(function(error){
        vrniJsonOdgovor(res, 500, error);
        return;
      })
    })
    .catch(function(error){
      vrniJsonOdgovor(res, 400, error);
      return;
    });
};

module.exports.updatePost = function(req, res) {
  if(req.params && req.params.postId) {
    if(req.body.comments|| req.body.createdAt) {
      vrniJsonOdgovor(res, 400, { 
        "sporočilo": "Attribute is not updatable."
      });
    } else {
      Post
        .update(
          { _id: mongoose.Types.ObjectId(req.params.postId)},
          { $set: req.body}
        ).then(function(newRes){
          vrniJsonOdgovor(res, 200, null);
        }).catch(function(error){
          vrniJsonOdgovor(res, 500, error);
        });
    }  
  } else {
    vrniJsonOdgovor(res, 400, { 
      "sporočilo": "Manjka enolični identifikator postId"
    });
  }
};

module.exports.deletePost = function(req, res){
  var idPost = req.params.postId;
  if(idPost){
    Post 
      .findByIdAndRemove(idPost)
      .exec(
        function(error, post) {
          if(error) {
            vrniJsonOdgovor(res, 404, error);
            return;
          }
          vrniJsonOdgovor(res, 204, null);
        }
      );
  } else {
    vrniJsonOdgovor(res, 400, {
      "sporočilo": 
        "Ne najdem posta, postId je obvezen parameter."
    });
  }
};
