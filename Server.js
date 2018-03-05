
var express=require('express');
var app=express();
var port=process.env.PORT || 8000;
var morgan=require('morgan');
var mongoose=require('mongoose');
var path=require('path');
var bodyParser = require('body-parser');
var router=express.Router();
var appRoutes=require('./app/routes/api')(router);
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));  // for parsing application/json
  // for parsing application/x-www-form-urlencoded
  app.use(express.static(__dirname+'/public'));
  app.use('/api',appRoutes);
//mongoose.connect('mongodb://localhost:27017/apinew',function(err){
   mongoose.connect('mongodb://lekshmir80:123@ds147228.mlab.com:47228/apinew',function(err){

   if(err)
   {
       console.log('Not connected to the db : '+err);
   
    }
    else
    {
    console.log('Connected to Mongodb');  
    } 
});

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname+'/public/app/views/index.html'));
    });


app.listen(port,function(err){
    if(!err){
        console.log("Connected to "+port);
    }else{
        console.log('not connected');
    }
});