var express = require('express');
var router = express.Router();

var ctrlUsers = require('../controllers/users');
var ctrlPosts = require('../controllers/posts');
var ctrlComments = require('../controllers/comments');

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


// POSTS routes  
router.get('/posts/:postId', 
  ctrlPosts.getPost);

router.put('/posts/:postId', 
  ctrlPosts.updatePost);

router.post('/posts', 
  ctrlPosts.createPost);

router.delete('/posts/:postId', 
  ctrlPosts.deletePost);  

module.exports = router;

// COMMENTS routes
router.post('/posts/:postId/comments',
  ctrlComments.createComment);