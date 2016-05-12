var User            = require('../../models/user.server.model');
var mongoose        = require('mongoose');
var bcrypt          = require('bcryptjs');
var util            = require('util');
var jwt             = require('jsonwebtoken');
var config          = require('../../config.js');  


var auth = {
    login: function(req, res){
        var username = req.body.username;
        var password = req.body.password;
        
        User.findOne({ username: username}, function(err, user){
            if(err) throw err;
            if(user){
                if(user.validPassword(password)){
                    user = user.toObject();
                    delete user.password;
                                   
                    
                    console.log('logged in...');
                    res.json({jwt: genJwtToken(user), success: true})
                }
                else{
                    console.log('Wrong credentials');
                    res.json({success: false})
                }
            }
            else{
                res.json({success: false});
            }
        })
    },
    signup: function(req, res){
  
        var username = req.body.username;
        var password = req.body.matchingPasswords.password;
        var email = req.body.email;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var country = req.body.country;
        var date = new Date;
        
        var user = new User();
        user.username= username;
        user.email = email;
        user.password = user.generateHash(password);;
        user.country = country;
        user.firstname = firstname;
        user.lastname = lastname;
        user.created_at = date;
        
        
        
        
        user.save(function(err, result){
            if(err)throw err;
            console.log(result);
            res.json({success: true})
        })
    }
}

function genJwtToken(payload){
    var token = jwt.sign(payload, config.secret);
    return token;
}
module.exports = auth;