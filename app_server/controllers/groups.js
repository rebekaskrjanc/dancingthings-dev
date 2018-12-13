var rp = require('request-promise');

module.exports.newgroup = async function(req, res){
  var path = '/groups';
  var envPath;
  var errorMsg;
  var parametriZahteve;
  if(process.env.NODE_ENV === 'production') {
    envPath = 'https://dancingthings.herokuapp.com/api';
  } else {
    envPath = 'http://localhost:' + (process.env.PORT || '3000') + '/api';
  }
  if(req.body.groupName!="") {
    
    parametriZahteve = {
      url: envPath + path,
      method: 'POST',
      json: true,
      body: {
        groupName: req.body.groupName,
        //GroupAdmin: 
      }
    };
  await asyncSignUp(parametriZahteve);
    
  } else {
    errorMsg = "The group you're creating has to have a name."
  }

  if(errorMsg) {
    res.render('index', { 
      title: 'Kreiranje skupine neuspešno',
      error: errorMsg
    });
  } else {
    res.render('index', { 
      title: 'Uspešno kreiranje skupine',
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





