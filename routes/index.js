var express = require('express');
var auth = require('./utils/auth.js');
var validation = require('./utils/validation.js');
var posts = require('./utils/posts.js');
var router = express.Router();

router.post('/signup', auth.signup);
router.post('/login', auth.login);

router.get('/checkUsername', validation.checkUsername);

router.post('/submitPost', posts.submit);
router.get('/getAllQuestions', posts.getAllQuestions);
router.get('/getPost', posts.getPost);
router.post('/submitAnswer', posts.answerPost);

router.get('/test', function(req, res){
    console.log('hello');
    res.json({success: true})
})

module.exports = router;