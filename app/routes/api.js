var User = require('../models/user');
var request=require('request');
var jwt = require('jsonwebtoken');
var secret='Harrypotter';
var querystring = require('querystring');
var NewUser=require('../models/user1');
var datetime = require('node-datetime');
var past = '2015-01-01 00:00:00';
var pastDateTime = datetime.create(past);
var date = require('date-and-time');
var am;
module.exports=function(router){
    router.post('/usersll',function(req,res){
    //USER REGISTRATION
    var user=new User();
    user.name=req.body.name;
    user.address= req.body.address;
    user.city =req.body.city;
    user.country =req.body.country;
    user.username =req.body.username;
    user.password =req.body.password;
 
    if(req.body.name==null||req.body.name==''||req.body.address==null||req.body.address==''||req.body.city==null||req.body.city==''||req.body.country==null||req.body.country==''||req.body.username==null||req.body.username==''||req.body.password==null||req.body.password==''){
     res.json({success:false,message:"Ensure Username,password,email were provided"});
    }else{
        user.save(function(err){
            if(err){
                res.json({success:false,message:"Username or email already exists"});
                 
            }else{
        res.json({success:true,message:"user Created"});
              
            }
        });  
    }
    
    });

//USER LOGIN

router.post('/authenticate',function(req,res){
 
    User.findOne({
        username:req.body.username}).select('_id name address city country username password').exec(function(err,user){
   
            if(err) throw err;
    if(!user){
        res.json({success:false,message:"User doesn't exist"});
    }else if(user){
    
        if(req.body.password)
     {var validPassword=  user.comparePassword(req.body.password);}else{
         res.json({success:false,message:"No password provided"});
     }
     if(!validPassword){
        res.json({success:false,message:"Incorrect Password"});
     }else{
         console.log('user._id');
        var token=   jwt.sign({
            id:user._id,
            username:user.username,
             
            city:user.city,
            country:user.country,
            name:user.name,
            address:user.address
        
        },
            secret,
            { expiresIn: '24h' }
        );
       res.json({success:true,message:"correct Password",token:token});
     }
    }
        });
    });


    router.use(function(req,res,next){
        var token=  req.body.token||req.body.query||req.headers['x-access-token'];
      if(token){
          //verify token
      jwt.verify(token,secret,function(err,decoded){
          if(err){
              res.json({success:false,message:"token invalid"});
          }else{
              req.decoded=decoded;
              next();
          }
      })
      
      }else{
          res.json({success:false,message:'no token provided'});
      }
      
      
      
      });
    router.post('/me',function(req,res){
        res.send(req.decoded);
        console.log(req.decoded);
    });
router.post('/temp',function(req,res){


//var myVar = setInterval(function(){ myTimer() }, 5000);
	//	function myTimer() {

var queryObject = {
    APPID: '4aaa2559c3e5eb3e66c20ad1a807281f',
    q:req.body.n
  
}
console.log(queryObject);

var weather='http://api.openweathermap.org/data/2.5/weather?';
request({
    url:weather,
    qs: queryObject,
}, function (error, response, body) {
  console.log(error);
  var reqt=JSON.parse(body);
am=reqt.main.temp;
console.log(am);
res.json({data:am});
var now = new Date();
var userperson=new NewUser();
console.log(req.body.h);
userperson.id1=req.body.m;
userperson.date1= now;
userperson.temp1 =am;
userperson.save(function(err){
    if(err){
        console.log(err);
         
    }else{
        console.log(' created');
      
    }
});
});
 //-timer}




});
router.post('/store',function(req,res){
    console.log('user');
    
});
router.post('/editt',function(req,res){
    NewUser.find({id1:req.body.m}).select('id1 date1 temp1').exec(function(err,userss){


        if(err){
   res.send({succes:false,message:'failure'});
}else{
res.json({succes:true,message:'ok',userss:userss});
   

}
    });
});



    router.use(function(req,res,next){
        var token=  req.body.token||req.body.query||req.headers['x-access-token'];
      if(token){
          //verify token
      jwt.verify(token,secret,function(err,decoded){
          if(err){
              res.json({success:false,message:"token invalid"});
          }else{
              req.decoded=decoded;
              next();
          }
      })
      
      }else{
          res.json({success:false,message:'no token provided'});
      }
      
      
      
      });


    return router;
}
