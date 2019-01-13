var mongoose = require('mongoose');
var Group = mongoose.model('Group');

var vrniJsonOdgovor = function(res, status, data) {
  res.status(status);
  res.json(data);
};

module.exports.getGroups = function(req, res) {
  Group
    .find()
    .exec(function(error, groups){
      if(error) {
        vrniJsonOdgovor(res, 500, error);
        return;
      } else {
        vrniJsonOdgovor(res, 200, groups);
      }
    });
};
module.exports.getGroup = function(req, res){
  if(req.params && req.params.groupId) {
    Group
      .findById(req.params.groupId)
      .exec(function(error, group){
        if(!group) {
          vrniJsonOdgovor(res, 404,  {
            "sporočilo": 
              "Ne najdem skupine s podanim enoličnim identifikatorjem groupId."
          });
          return;
        } else if (error) {
          vrniJsonOdgovor(res, 500, error);
          return;
        }
        vrniJsonOdgovor(res, 200, group);
      });
  } else {
    vrniJsonOdgovor(res, 400, { 
      "sporočilo": "Manjka enolični identifikator groupId"
    });
  }
};

module.exports.createGroup = function(req, res) {
  Group.create({
    groupName: req.body.groupName,
    about: req.body.about,
    groupAdmin: req.body.groupAdmin

  }, function(error, group) {
    if (error) {
      vrniJsonOdgovor(res, 400, error);
    } else {
      vrniJsonOdgovor(res, 201, group);
    }
  });
};

module.exports.updateGroup = function(req, res) {
  console.log("AAAA");
  if(req.params && req.params.groupId) {
      Group
        .update(
          { _id: mongoose.Types.ObjectId(req.params.groupId)},
          { $set: req.body}
        ).then(function(newRes){
          vrniJsonOdgovor(res, 200, req.body);
        }).catch(function(error){
          vrniJsonOdgovor(res, 500, error);
        });
    } else {
    	vrniJsonOdgovor(res, 400, { 
    	"sporočilo": "Manjka enolični identifikator groupId"
    	});
  	}
};

module.exports.deleteGroup = function(req, res){
  var idGroup = req.params.groupId;
  if(idGroup){
    Group 
      .findByIdAndRemove(idGroup)
      .exec(
        function(error, group) {
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
        "Ne najdem skupine, groupId je obvezen parameter."
    });
  }
};


