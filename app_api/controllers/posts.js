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
