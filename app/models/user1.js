var mongoose = require('mongoose');
var Schema = mongoose.Schema;

  var Person = new Schema({
      
    id1 : {type : String,required : true},
  date1 : {type : String,required : true},
    temp1 : {type : String,required : true}
});

module.exports=mongoose.model('NewUser',Person);
