var rp = require('request-promise');

module.exports.signup = async function(req, res){
  var path = '/users';
  var envPath;
  var errorMsg;
  var idUser;
  var parametriZahteve;
  if(process.env.NODE_ENV === 'production') {
    envPath = 'https://dancingthings.herokuapp.com/api';
  } else {
    envPath = 'http://localhost:' + (process.env.PORT || '3000') + '/api';
  }
  if(req.body) {
    if((req.body.username != "") && (req.body.firstname != "") && (req.body.email != "") && 
      (req.body.password != "") && (req.body.passwordRetype != "") && (req.body.state != "") &&
      (req.body.state != "") && (req.body.city != "") && (req.body.gender != "") &&
      (req.body.dance != "") && (req.body.password == req.body.passwordRetype)) {
      parametriZahteve = {
        url: envPath + path,
        method: 'POST',
        json: true,
        body: {
          username: req.body.username,
          name: req.body.firstname,
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
    res.render('Homepage', { 
      title: parametriZahteve.url,
    });
  }
};

module.exports.addUserDB = async function(req, res){
  var path = '/users';
  var envPath;
  var errorMsg;
  var idUser;
  var parametriZahteve;
  if(process.env.NODE_ENV === 'production') {
    envPath = 'https://dancingthings.herokuapp.com/api';
  } else {
    envPath = 'http://localhost:' + (process.env.PORT || '3000') + '/api';
  }
  if(req.body) {
    if((req.body.username != "") && (req.body.firstname != "") && (req.body.email != "") && 
      (req.body.password != "") && (req.body.passwordRetype != "") && (req.body.state != "") &&
      (req.body.state != "") && (req.body.city != "") && (req.body.gender != "") &&
      (req.body.dance != "") && (req.body.password == req.body.passwordRetype)) {
      parametriZahteve = {
        url: envPath + path,
        method: 'POST',
        json: true,
        body: {
          username: req.body.username,
          name: req.body.firstname,
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
    res.render('index', { 
      title: 'neuspesno',
      error: errorMsg
    });
  } else {
    res.render('index', { 
      title: 'uspesno',
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


