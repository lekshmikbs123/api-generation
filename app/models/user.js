var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var bcrypt = require('bcrypt-nodejs');
  
  
  var UserSchema = new Schema({
      
      name : {type : String,required : true},
      address : { type: String,required : true},
      city : {type : String,required : true,},
      country:{type: String,required : true},
      username : {type : String,required : true,unique : true},
      password : {type : String,required : true},
  });

UserSchema.pre('save',function(next){
  var user = this;
  bcrypt.hash(user.password,null,null,function(err,hash)
  {
       if(err) return next(err);
        user.password = hash;
        next();

    });
});

UserSchema.methods.comparePassword=function(password){
return bcrypt.compareSync(password,this.password);
};

module.exports = mongoose.model('User',UserSchema);
