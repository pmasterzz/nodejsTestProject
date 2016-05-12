var User = require('../models/user.server.model');
var Post = require('../models/post.server.model');
var fs = require('fs');
var mongoose = require('mongoose');
var async = require('async');
var config          = require('../config.js');  

var db = mongoose.connection;
mongoose.connect(config.database);
db.on('error', console.error);

generateUsers();

function generateUsers() {
    var users = fs.readFileSync('../users-json.json');


    async.each(JSON.parse(users), function (user, cb) {
        
        console.log('hi');
        // var newUser = new User();
        // newUser.firstname = user.firstname;
        // newUser.lastname = user.lastname;
        // newUser.username = user.username;
        // newUser.password = newUser.generateHash(user.password);
        // newUser.country = user.country;
        // newUser.email = user.email;

        // newUser.save(function (err, result) {
        //     if (err) throw err;
        //     console.log(result);
        //     cb();
        // })

//total. 
    });


    // JSON.parse(users).forEach(function(user) {
    //     var newUser = new User();
    //     newUser.firstname = user.firstname;
    //     newUser.lastname = user.lastname;
    //     newUser.username = user.username;
    //     newUser.password = newUser.generateHash(user.password);
    //     newUser.country = user.country;
    //     newUser.email = user.email;

    //     newUser.save(function(err, result){
    //         if(err)throw err;
    //         console.log('done');
    //     })
    // });
}

