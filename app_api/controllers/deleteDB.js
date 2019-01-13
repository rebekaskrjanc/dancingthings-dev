var rp = require('request-promise');
var mongoose = require('mongoose');
var User = mongoose.model('prijavaUser');
var Group = mongoose.model('Group');
var Post = mongoose.model('Post');
var envPath;

if(process.env.NODE_ENV === 'production') {
  envPath = 'https://dancingthings.herokuapp.com/api';
} else {
  envPath = 'http://localhost:' + (process.env.PORT || '3000') + '/api';
}

module.exports.deleteUserDB = async function(req, res){
  var errorMsg;
  var successMsg;

  var usersDrop = await dropUsers();
  var groupDrop = await dropGroup();
  var postDrop = await dropPost();
  res.render('index', { 
      title: 'All collections are now empty. Return to the DB page and start inserting some data.',
    });
  
};
async function dropUsers() {
  
  return await User.deleteMany();
  
}

async function dropGroup() {
  return await Group.deleteMany();
}

async function dropPost() {
  return await Post.deleteMany();
}