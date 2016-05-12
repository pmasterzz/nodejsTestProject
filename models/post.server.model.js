var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

//create a schema
var postSchema = new Schema({
    question: {type: String, required: true},
    answers: [{
        answer: {type: String, required: true},
        selected: {type: Number, default: 0}
    }],
    answeredBy: [Schema.ObjectId],
    userId: {type: Schema.ObjectId, required: true}

});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;