
angular.module('mainController',['authServices'])

.controller('mainCtrl',function(Auth,$timeout,$location,User,$rootScope,$http,$scope){
    var app=this;
   


    $rootScope.$on('$routeChangeStart',function(){
       
if(Auth.isLoggedIn()){
Auth.getUser().then(function(data){
    app.isLoggedIn=true;
    app.id=data.data.id;
    $scope.id=data.data.id;
    app.username=data.data.username;
    app.city=data.data.city;
    console.log(data);
    app.country=data.data.country;
    app.name=data.data.name;
    app.address=data.data.address;
    console.log(n);
   var n=data.data.city;
   var m=data.data.id;
console.log(n);
    $http.post('/api/temp',{n,m}).then(function(data){
        console.log(data.data.value);
      
       
    });
    $http.post('/api/editt',{m}).then(function(data){
      //  console.log(data);
       
      console.log(data.data.userss.temp1);
     $scope.dataa=data.data.userss;
      var kk=data.data.userss.temp1;

      app.show=function(datee){
       
   // console.log(type(datee));
   // console.log(type(data.data.userss.date1));
    console.log(datee+'user');
    
   if(datee===data.data.userss.date1){

     $scope.dataa=data.data.userss;
   }else{
       console.log('error');
   }
    };
    });
   
  
   
   
}) ;

}else{
    app.username='' ;
    app.isLoggedIn=false;
}
});

this.showAll=function(){
    app.limit=undefined;
    app.showMoreError=false;
};


    this.doLogin=function(loginData,$http){
        app.loading=true;
        app.errorMsg=false;
        Auth.login(app.loginData).then(function(data,$http){
  
           if(data.data.success){
        //create success message
        app.loading=false;
    app.successMsg=data.data.message+' .........Redirecting.......';
   

    $timeout(function(){
        $location.path('/edit');
        app.loginData='';
        app.successMsg=false;
    },2000);//2000 ms
        //redirect to home page
    
    }else{
        app.loading=false;
        app.errorMsg=data.data.message;
        //create  error message
    }
    
    
        });
        // console.log('here');
        };


    this.logout=function(){
Auth.logout();
$location.path('/logout');

$timeout(function(){
$location.path('/');
},2000);
    }   ; 
    })
 .controller('editCtrl',function(){
  
    
 });



