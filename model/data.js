var mongoose = require('mongoose');
//var bcrypt= require('bcryptjs');



var UserSchema = mongoose.Schema({
    name: {
        type: String,
        index: true,
        unique: true
    },
    num_employees: {
        type: Number,
    },
    contact_email: {
        type: String,
    },
    year_founded: {
        type: Number,
    },
    contact_name: {
        type: String,
    },
    rankings: [{ financials: Number, team: Number, idea: Number }]


});


var User = module.exports = mongoose.model("Data", UserSchema);

module.exports.createData = function (newUser, callback) {

    newUser.save(callback);

}
//var locInfo = [];
var newList = [];
module.exports.getDataByName = function (name, callback) {
    var query = { name: name };
    User.findOne(query, callback);
}
//var util = require("util");
// console.log(util.inspect(rankings, {showHidden: false, depth: null}));
module.exports.getDataById = function (id, callback) {
    User.findById(id, callback);
}




module.exports.getRank = function (user) {
    User.find({}, user);
    // console.log(user);
}
module.exports.getAllData = function (user) {
    User.find({}, user);
    // console.log(user);
}

module.exports.removeData = function (name, callback) {
    var query = { name: name };
    let x = User.findOne(query);

    User.remove(x, callback);

}
module.exports.getRankByCategory = function (y, r, min, min1, min2, user) {
    User.find({}, user);
    // console.log(user);
}



module.exports.updateData = function (name1, name, num_employees, contact_email, year_founded, contact_name, financials, team, idea, callback) {
    var query = { name: name };
    let x = User.findOne(query);

    // console.log("saloi");
    //  console.log("testing"+x._id);


    User.update((x, { $set: { name: name, num_employees: num_employees, contact_email: contact_email, year_founded: year_founded, contact_name: contact_name, rankings: [{ financials: financials, team: team, idea: idea }] } }), callback);

}



/*

module.exports.comparePassword = function(candidatePassword,hash,callback){
    bcrypt.compare(candidatePassword,hash,function(err,isMatch){
        if(err) throw err;
        callback(null,isMatch);
    });
}
*/