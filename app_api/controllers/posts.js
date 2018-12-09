var mongoose = require('mongoose');
var User = mongoose.model('User');
var Post = mongoose.model('Post');

var vrniJsonOdgovor = function(res, status, data) {
  res.status(status);
  res.json(data);
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
