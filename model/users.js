var mongoose= require('mongoose');
var bcrypt= require('bcryptjs');



var UserSchema = mongoose.Schema({
    username : {
        type : String,
        index : true
    },
    password : {
        type : String,
        
    },
    type:{
        type: String,
    }
  
});

var User = module.exports = mongoose.model("User",UserSchema);

module.exports.createUser = function(newUser,callback){
    var bcrypt = require('bcryptjs');
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            // Store hash in your password DB.
            newUser.password = hash;
            newUser.save(callback); 
        });
    });
} 

module.exports.getUserByUsername = function(username,callback){
    var query = {username : username};
    User.findOne(query,callback);
}
// module.exports.getUserBytype = (function(type,callback){
//     console.log(type);
//     var query = {type : type};
//     User.findOne(query,callback);
// }


module.exports.getUserById = function(id,callback){
    User.findById(id,callback);
}

module.exports.comparePassword = function(candidatePassword,hash,callback){
    bcrypt.compare(candidatePassword,hash,function(err,isMatch){
        if(err) throw err;
        callback(null,isMatch);
    });
}
