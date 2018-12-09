var express = require('express');
var router = express.Router();

var ctrlUsers = require('../controllers/users');


// USERS routes.
router.get('/users', // get all users
  ctrlUsers.getUsers);

router.get('/users/:userId', //get certain user
  ctrlUsers.getUser);

router.put('/users/:userId', 
  ctrlUsers.updateUser); //updateWholeUser

router.post('/users', 
  ctrlUsers.createUser);

router.delete('/users/:userId', 
  ctrlUsers.deleteUser);


module.exports = router;