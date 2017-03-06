var express= require('express');
var router = express.Router();


var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;


var User= require('../model/users');
var data= require('../model/data');
    var data1;

router.get('/', function(req,res){
    res.render('register');

});

function ensureAuthenticated(req, res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect('/login');
        
    }
    }

router.get('/index', function(req,res){
    res.render('index');

});

router.get('/login', function(req,res){
    res.render('login');

});

router.get('/logout', function(req,res){
    req.logout();
    req.flash('success_msg', "Logged out!!")
    res.redirect('/login');
    })


router.post('/login', function(req,res){

    var username = req.body.username;
    var password = req.body.password;
    var confirmPassword = req.body.password2;
   var type= req.body.dropdown;

  console.log(type);

 

 req.checkBody('username', 'username is required').notEmpty();
 req.checkBody('password', 'passowrd is required').notEmpty();
 req.checkBody('password2', 'passwords do not match').equals(req.body.password);



 var errors= req.validationErrors();


 if(errors)
{
    res.render('register',{
        errors:errors
    });
    
}
else
{
var newUser = new User({
            username : username,
            password : password,
            type: type,
           
        })
     User.createUser(newUser,function(err,user){
            if(err) throw err;
            console.log(user);
        })

        req.flash("success_msg","You are registered and can now login");
        res.redirect("/login");
    
}
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username,function(err,user){
        if(err) throw err;
        if(!user)
        {
            return done(null,false,{message : "Invalid Username"});
        }
  

        User.comparePassword(password,user.password,function(err,isMatch){
            if(err) throw err;
            if(isMatch)
            {
                return done(null,user);
            }
            else
            {
                return done(null,false,{message : "Invalid Password"});
            }
        })
 
    })  
}
  
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});


router.post('/index',
passport.authenticate('local',{failureRedirect:'/login', failureFlash: true}),


function(req,res){
    var type= req.body.dropdown;
    //console.log(type);

    if(type=="Admin")
    res.redirect('/dashboardAdmin');
    else 
    res.redirect('/dashboardUser');

})

router.get('/dashboardAdmin', function(req,res){
    res.render('dashboardAdmin');

});

router.get('/dashboardUser', function(req,res){
    data1= req.body.companyName;
    res.render('dashboardUser');

});

// router.get('/add', function(req,res){
//     data.getAllData().then((result)=>{
//             res.render('temp',{response: result, layout:false});

//     })

// });


router.post('/dashboardAdmin', function(req,res){
var name = req.body.name;
var num_employees = req.body.num_employees;
var contact_email = req.body.contact_email;
var contact_name = req.body.contact_name;
var year_founded = req.body.year_founded;
var financials = req.body.financials;
var team = req.body.team;
var idea = req.body.idea;


 

 req.checkBody('name', 'username is required').notEmpty();
 req.checkBody('num_employees', 'num_employees required').notEmpty();
 req.checkBody('contact_email', 'email is required').notEmpty();
 req.checkBody('contact_email', 'email is not in the correct format').isEmail();
 req.checkBody('contact_name', 'contact name is required').notEmpty();
 req.checkBody('year_founded', 'year founded is required').notEmpty();
 req.checkBody('financials', 'financial rank is required').notEmpty();
 req.checkBody('team', 'team rank is required').notEmpty();
 req.checkBody('idea', 'idea rank is required').notEmpty();



 var errors= req.validationErrors();


 if(errors)
{
    res.render('login',{
        errors:errors
    });
    
}

else{

var newData = new data({
            name:name,    
            num_employees: num_employees,
            contact_email:contact_email,
            year_founded:year_founded,
            contact_name:contact_name,
            rankings: [
                {
                    financials:financials,
                    team:team,
                    idea:idea
                }
            ]       
           
        })


        
     data.createData(newData,function(err,user){
            if(err) throw err;
       else
    data.getAllData(function(err,user){
        if(err) throw err;
        res.render('temp',{response: user, layout:false});
    
    })

})
}
});
router.post('/removeData', function(req,res){
    var name = req.body.name1;
            console.log(name);
            console.log("hbhbb");

       data.removeData(name,function(err,user){
            if(err) throw err;
         else
         data.getAllData(function(err,user){
   
            res.render('removed',{user});
       })
})

});


router.post('/updated', function(req,res){
   
 var name1 = req.body.name;
var name = req.body.updatedName;
var num_employees = req.body.updated_num_employees;
var contact_email = req.body.updated_contact_email;
var contact_name = req.body.updated_contact_name;
var year_founded = req.body.updated_year_founded;
var financials = req.body.updated_financials;
var team = req.body.updated_team;
var idea = req.body.updated_idea;


 
 req.checkBody('name', 'username is required').notEmpty();
 req.checkBody('updatedName', 'username is required').notEmpty();
 req.checkBody('updated_num_employees', 'num_employees required').notEmpty();
 req.checkBody('updated_contact_email', 'email is required').notEmpty();
 req.checkBody('updated_contact_email', 'email is not in the correct format').isEmail();
 req.checkBody('updated_contact_name', 'contact name is required').notEmpty();
 req.checkBody('updated_year_founded', 'year founded is required').notEmpty();
 req.checkBody('updated_financials', 'financial rank is required').notEmpty();
 req.checkBody('updated_team', 'team rank is required').notEmpty();
 req.checkBody('updated_idea', 'idea rank is required').notEmpty();



 var errors= req.validationErrors();


 if(errors)
{
    res.render('login',{
        errors:errors
    });
    
}

else{
       data.updateData(name1,name,num_employees,contact_email,year_founded,contact_name,financials,team,idea, function(err,user){
            if(err) throw err;
         else{
         data.getAllData(function(err,user){
   
            res.render('removed',{user});
         })
       
}
       })

}
});

router.post('/dashboardUser', function(req,res){
var name1 = req.body.companyName;

data.getDataByName(name1,function(err,user){
    if(err) throw err;
    else
    res.render('userdata',{user})
})

  
    })



router.get('/userdata', function(req,res){
    res.render('userdata');

});



let c=[];

let i=0;
let k=0;
 let final=[];



router.post('/userRank', function(req,res){
    let y= req.body.numberCompany;
        var r= req.body.categoryCompany;




//console.log(y);

data.getRank(function(err,user){
    if(err) throw err;
    else{
 for (let i = 0; i < user.length; i++) {

    c[i]=user[i].rankings[0].idea;   
    console.log(c[i]);

 }


let min=c[0];


 for (let i = 1; i < c.length; i++) {
        if(min>c[i])
            min= c[i];

}
console.log(min);
         

         

   

  
//  for (let i = 0; i < user.length; i++) {
// console.log(user[i]);


//  }
let l=0;
while(i<user.length){
    if(user[i].rankings[0].idea==min && k<y){
        final[l]=user[i];
                k++;
                l++;
}
        i++;

}




 for (let i = 0; i < final.length; i++) {
console.log(final[i]);


 }

     res.render('userRank',{final})
    }

});



    
});

module.exports= router;