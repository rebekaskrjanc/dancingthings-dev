var rp = require('request-promise');
var envPath;

if(process.env.NODE_ENV === 'production') {
  envPath = 'https://dancingthings.herokuapp.com/api';
} else {
  envPath = 'http://localhost:' + (process.env.PORT || '3000') + '/api';
}

/* GET my account page */
module.exports.showMyProfile = async function(req, res) {
  var errorMsg;

  if(req.params && req.params.userId) {
    currentUser = await getCurrentUser(req.params.userId);
  } else {
    errorMsg = "userId is missing from url."
  }

  if(!currentUser) {
    errorMsg = 'Couldnt find User with specified userId'
    res.render('error', {
      errorMsg: errorMsg
    });
  } else {
    res.render('my-profile', {
      user: currentUser
    });
  }
};

module.exports.showEditProfile = async function(req, res) {
  var errorMsg;

  if(req.params && req.params.userId) {
    currentUser = await getCurrentUser(req.params.userId);
  } else {
    errorMsg = "userId is missing from url."
  }

  if(!currentUser) {
    errorMsg = 'Couldnt find User with specified userId'
    res.render('error', {
      errorMsg: errorMsg
    });
  } else {
    res.render('editprofile', {
      user: currentUser
    });
  }
}

async function getCurrentUser(id_user) {
  var path = '/users/' + id_user;
  var paramsReq = {
    url: envPath + path,
    method: 'GET',
    json: {}
  };

  try {
    return await rp(paramsReq).promise();
  } catch (error) {
    return error;
  }
};
