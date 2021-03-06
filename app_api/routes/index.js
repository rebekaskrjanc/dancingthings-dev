var express = require('express');
var router = express.Router();

var jwt = require('express-jwt');
var avtentikacija = jwt({
  secret: process.env.JWT_GESLO,
  userProperty: 'payload'
});

var ctrlUsers = require('../controllers/users');
var ctrlPosts = require('../controllers/posts');
var ctrlComments = require('../controllers/comments');
var ctrlGroups = require('../controllers/groups');
var ctrlAvtentikacija = require('../controllers/avtentikacija');
var ctrldeleteDB = require('../controllers/deleteDB');

// USERS routes.
router.get('/users', // get all users
  ctrlUsers.getUsers);

router.get('/users/:userId', //get certain user
  ctrlUsers.getUser);

router.put('/users/:userId', 
  ctrlUsers.updateUser); 

router.post('/users', 
  ctrlUsers.createUser);

router.delete('/users/:userId', 
  ctrlUsers.deleteUser);

router.get('/users/deleteUserDB', // get all users
  ctrlUsers.deleteUserDB);

/* Avtentikacija */
router.post('/registracija', ctrlAvtentikacija.registracija);
router.post('/prijava', ctrlAvtentikacija.prijava);

// POSTS routes
router.get('/posts', ctrlPosts.getPosts);

router.get('/posts/:postId',
  ctrlPosts.getPost);

router.put('/posts/:postId',
  ctrlPosts.updatePost);

router.post('/posts',
  ctrlPosts.createPost);

router.delete('/posts/:postId',
  ctrlPosts.deletePost);  



// COMMENTS routes
router.post('/posts/:postId/comments',
  ctrlComments.createComment);

// GROUPS routes
router.get('/groups', // get all users
  ctrlGroups.getGroups);

router.get('/groups/:groupId', //get certain user
  ctrlGroups.getGroup);

router.put('/groups/:groupId', 
	ctrlGroups.updateGroup); 

router.post('/groups', avtentikacija,
  ctrlGroups.createGroup);

router.delete('/groups/:groupId', 
  ctrlGroups.deleteGroup);

router.get('/deleteUserDB', ctrldeleteDB.deleteUserDB);

module.exports = router;