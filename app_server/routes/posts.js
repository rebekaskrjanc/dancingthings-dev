var express = require('express');
var router = express.Router();
var ctrlComments = require('../controllers/posts');

/* GET home page. */
router.get('/', ctrlPosts.index);

router.post('/new', ctrlPosts.newPost);

//search by the name
//get all comments with the certain name
router.get('/search', ctrlPosts.getPostsByName);

router.post('/delete', ctrlPosts.deleteById);

module.exports = router;