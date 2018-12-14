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
};

module.exports.editProfile = async function(req, res) {
  var errorMsg;
  var user;

  user = await getCurrentUser(req.params.userId);
  if(user.error){
    errorMsg = 'Couldnt get user with userId';
  }

  if(req.body){
    if(req.body.password != req.body.passwordRetype) {
      errorMsg = 'Password Retype must match Password!';
    }
    if(req.body.name || req.body.email || req.body.dance) {
      var userUpdate = await updateUser(req.body, user._id);
    } else {
      errorMsg = 'Fill out required inputs!'
    }
  } else {
    errorMsg = 'Fill out required inputs!';
  }

  user = await getCurrentUser(req.params.userId);
  if(user.error){
    errorMsg = 'Couldnt get user with userId';
  }

  if(errorMsg) {
    res.render('editprofile', {
      errorMsg: errorMsg,
      user: user
    });
  } else {
    res.render('my-profile', {
      user: user
    });
  }
};

module.exports.deleteUserReq = async function(req, res){
  var errorMsg;
  var user;

  user = await getCurrentUser(req.params.userId);
  if(user.error){
    errorMsg = 'Couldnt get current user.';
  } else {
    userDelete = await deleteUser(user._id);
  }

  if(errorMsg){
    res.render('my-profile', {
      user: user
    });
  } else {
    res.render('signup');
  }

};

async function deleteUser(id_user) {
  var path = '/users/' + id_user;
  var paramsReq = {
    url: envPath + path,
    method: 'DELETE',
    json: {},
  };

  try {
    return await rp(paramsReq).promise();
  } catch (error) {
    return error;
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


async function updateUser(body, id_user) {
  var path = '/users/' + id_user;
  var paramsReq = {
    url: envPath + path,
    method: 'PUT',
    json: true,
    body: {
      password: body.password,
      passwordRetype: body.passwordRetype,
      firstname: body.firstname,
      email: body.email,
      state: body.state,
      city: body.city,
      gender: body.gender,
      dance: body.dance
    }
  };

  try {
    return await rp(paramsReq).promise();
  } catch (error) {
    return error;
  }
};
