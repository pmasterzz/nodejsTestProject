var User = require('../../models/user.server.model');
var mongoose = require('mongoose');

var validation = {
    checkUsername: function (req, res) {
        User.find({ username: req.body.username }, function (err, user) {
            if (err) throw err;
            if (user)
                res.json({success: true});
            else
                res.json({success: false});
        })
    }
}
module.exports = validation;