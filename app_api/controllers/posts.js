var mongoose = require('mongoose');
var User = mongoose.model('User');
var Post = mongoose.model('Post');
var Uporabnik = mongoose.model('prijavaUser');

var vrniJsonOdgovor = function(res, status, data) {
  res.status(status);
  res.json(data);
};

module.exports.getPosts = function(req, res) {
  Post
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

module.exports.getPost = function(req, res) {
  if(req.params && req.params.postId) {
    if (!(/^\w+$/.test(req.params.postId)) || Object.keys(req.query).length > 0) {
      vrniJsonOdgovor(odgovor, 400, {
        "sporočilo": "Napačna zahteva!"
      });
      return;
    }
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
  Post.create({
      text: req.body.text,
      postAuthor: req.body.imeUporabnika

  }, function(error, post) {
    if (error) {
      console.log(error);
      vrniJsonOdgovor(res, 400, error);
    } else {
      vrniJsonOdgovor(res, 201, post);
    }
  });
};

module.exports.updatePost = function(req, res) {
  if(req.params && req.params.postId) {
    if(req.body.createdAt) {
      vrniJsonOdgovor(res, 400, { 
        "sporočilo": "Attribute is not updatable."
      });
    } else {
      Post
        .update(
          { _id: mongoose.Types.ObjectId(req.params.postId)},
          { $set: req.body}
        ).then(function(newRes){
          vrniJsonOdgovor(res, 200, req.body);
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

var vrniAvtorja = function(zahteva, odgovor, povratniKlic) {
  if (zahteva.payload && zahteva.payload.email) {
    Uporabnik
      .findOne({
        email: zahteva.payload.email
      })
      .exec(function(napaka, uporabnik) {
        if (!uporabnik) {
          vrniJsonOdgovor(odgovor, 404, {
            "sporočilo": "Ne najdem uporabnika"
          });
          return;
        } else if (napaka) {
          vrniJsonOdgovor(odgovor, 500, napaka);
          return;
        }
        povratniKlic(zahteva, odgovor, uporabnik.ime);
      });
  } else {
    vrniJsonOdgovor(odgovor, 400, {
      "sporočilo": "Ni podatka o uporabniku"
    });
    return;
  }
};

