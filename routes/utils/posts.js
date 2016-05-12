var User = require('../../models/user.server.model');
var Post = require('../../models/post.server.model');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var util = require('util');

var posts = {
    submit: function (req, res) {
        var id = req.body.id;
        var post = req.body.post;
        var answers = [];

        post.answers.forEach(function (answer) {
            answers.push({ answer: answer, selected: 0 })
        });

        var newPost = new Post();
        newPost.question = post.question;
        newPost.answers = answers;
        newPost.userId = id;

        newPost.save(function (err, result) {
            if (err) throw err;
            User.findOneAndUpdate(
                { _id: id },
                { $push: { posts: result._id } },
                { safe: true, upsert: true },
                function (err, model) {
                    if (err) throw (err);
                    console.log(model);
                    res.json({ success: true });
                }
            )
        })





    },
    getAllQuestions: function (req, res) {
        // User.find({ posts: { $gt: [] } }, 'posts _id', function (err, questions) {
        //     if (err) throw err;
        //     console.log(questions);
        //     res.json({ questions: questions })
        // })

        Post.find({}, 'question _id', function (err, questions) {
            if (err) throw err;
            res.json({ questions: questions })
        })
    },
    getPost: function (req, res) {
        var id = mongoose.Types.ObjectId(req.query.id);

        Post.findOne({ '_id': id }, function (err, result) {
            if (err) throw err;
            res.json({ post: result });
        })
    },
    answerPost: function (req, res) {
        var answer = req.body.answer;
        var user = req.body.user;

        Post.update({ 'answers._id': answer._id }, {
            '$inc': {
                'answers.$.selected': 1
            },
            '$push': { 'answeredBy': user._id },

        },
            { safe: true, upsert: true }, function (err, result) {
                if (err) throw err;
                res.json({success: true});
            })
    }
}

module.exports = posts;


