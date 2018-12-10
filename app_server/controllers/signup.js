var rp = require('request-promise');

module.exports.signup = async function(req, res){
  var path = '/users';
  var envPath;
  var errorMsg;
  if(process.env.NODE_ENV === 'production') {
    envPath = 'https://dancingthings.herokuapp.com/api';
  } else {
    envPath = 'http://localhost:' + (process.env.PORT || '3000') + '/api';
  }
  if(req.body) {
    if(req.body.password == req.body.passwordRetype) {
      var parametriZahteve = {
        url: envPath + path,
        method: 'POST',
        json: true,
        body: {
          username: req.body.username,
          name: req.body.name,
          password: req.body.password,
          email: req.body.email,
          state: req.body.state,
          city: req.body.city,
          gender: req.body.gender,
          dance: req.body.dance
        }
      };
      await asyncSignUp(parametriZahteve);
    } else {
      errorMsg = "Passwords dont match."
    }
  } else {
    errorMsg = "Enter required fields."
  }

  if(errorMsg) {
    res.render('signup', { 
      title: 'Sign Up',
      error: errorMsg
    });
  } else {
    res.render('index', { 
      title: 'Homepage',
    });
  }
};

async function asyncSignUp(parametriZahteve) {
 
  try {
    return await rp(parametriZahteve).promise();
  } catch (error) {
    return error;
  }
}

