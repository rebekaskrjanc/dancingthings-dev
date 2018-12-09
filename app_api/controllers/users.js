var mongoose = require('mongoose');
var User = mongoose.model('User');

var vrniJsonOdgovor = function(res, status, data) {
  res.status(status);
  res.json(data);
};

module.exports.getUsers = function(req, res) {
  User
    .find()
    .exec(function(error, users){
      if(error) {
        vrniJsonOdgovor(res, 500, error);
        return;
      } else {
        vrniJsonOdgovor(res, 200, users);
      }
    });
};

module.exports.getUser = function(req, res){
  if(req.params && req.params.userId) {
    User
      .findById(req.params.userId)
      .exec(function(error, user){
        if(!user) {
          vrniJsonOdgovor(res, 404,  {
            "sporočilo": 
              "Ne najdem userja s podanim enoličnim identifikatorjem userId."
          });
          return;
        } else if (error) {
          vrniJsonOdgovor(res, 500, error);
          return;
        }
        vrniJsonOdgovor(res, 200, user);
      });
  } else {
    vrniJsonOdgovor(res, 400, { 
      "sporočilo": "Manjka enolični identifikator userId"
    });
  }
};

module.exports.updateUser = function(req, res) {
  if(req.params && req.params.userId) {
    if(req.body.username || req.body.password || req.body.posts) {
      vrniJsonOdgovor(res, 400, { 
        "sporočilo": "Attribute is not updatable."
      });
    } else {
      User
        .update(
          { _id: mongoose.Types.ObjectId(req.params.userId)},
          { $set: req.body}
        ).then(function(newRes){
          vrniJsonOdgovor(res, 200, null);
        }).catch(function(error){
          vrniJsonOdgovor(res, 500, error);
        });
    }  
  } else {
    vrniJsonOdgovor(res, 400, { 
      "sporočilo": "Manjka enolični identifikator userId"
    });
  }
};

module.exports.createUser = function(req, res) {
  User.create({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    email: req.body.email,
    state: req.body.state,
    gender: req.body.gender,
    dance: req.body.dance

  }, function(error, user) {
    if (error) {
      vrniJsonOdgovor(res, 400, error);
    } else {
      vrniJsonOdgovor(res, 201, user);
    }
  });
};

module.exports.deleteUser = function(req, res){
  var idUser = req.params.userId;
  if(idUser){
    User 
      .findByIdAndRemove(idUser)
      .exec(
        function(error, user) {
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
        "Ne najdem userja, userId je obvezen parameter."
    });
  }
};