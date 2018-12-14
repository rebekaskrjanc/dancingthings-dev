var rp = require('request-promise');
var envPath;

if(process.env.NODE_ENV === 'production') {
  envPath = 'https://dancingthings.herokuapp.com/api';
} else {
  envPath = 'http://localhost:' + (process.env.PORT || '3000') + '/api';
}

module.exports.addComment = async function(req, res) {
  var errorMsg;
  
  if(req.params.postId && req.params.commentAuthor){
    if(req.body){
      await createComment(req.body, req.params.postId, req.params.commentAuthor);
    } else{
      errorMsg = "No comment text was added into input."
    }
  } else {
    errorMsg = "postId wasnt added as a url parameter."
  }
};

module.exports.getIndexPage = async function(req, res) {
  var errorMsg;

  var allPosts = await getPosts();
  if(allPosts.error){
    errorMsg = 'Failed getting users posts.';
  }

  if(errorMsg) {
    res.render('error', {
      errorMsg: errorMsg
    });
  } else {
    res.render('homepage', {
      posts: allPosts
    });
  }
};

async function getPosts() {
  var path = '/posts';
  var paramsReq = {
    url: envPath + path,
    method: 'GET',
    json: {}
  }

  try {
    return await rp(paramsReq).promise();
  } catch (error) {
    return error;
  }
};

async function createComment(body, id_post, commentAuthor_id){
  var path = '/posts/' + id_post + '/comments';
  var paramsReq = {
    url: envPath + path,
    method: 'POST',
    json: true,
    body: body
  };

  try {
    return await rp(paramsReq).promise();
  } catch (error) {
    return error;
  }
};
