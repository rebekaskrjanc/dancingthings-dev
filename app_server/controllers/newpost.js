var rp = require('request-promise');

module.exports.newpost = async function(req, res){
  var path = '/posts';
  var envPath;
  var errorMsg;
  var parametriZahteve;
  if(process.env.NODE_ENV === 'production') {
    envPath = 'https://dancingthings.herokuapp.com/api';
  } else {
    envPath = 'http://localhost:' + (process.env.PORT || '3000') + '/api';
  }
  if(req.body.vsebinaObjave!="") {
    
    parametriZahteve = {
    url: envPath + path,
    method: 'POST',
    json: true,
    body: {
      text: req.body.vsebinaObjave,
      postAuthor: req.params.userId,
      comments: []
    }
  };
  await asyncSignUp(parametriZahteve);
    
  } else {
    errorMsg = "There's no text."
  }

  if(errorMsg) {
    res.render('index', { 
      title: 'Neuspesna objava',
      error: errorMsg
    });
  } else {
    res.render('index', { 
      title: 'Uspešna objava',
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


