//  angular.module('userApp',['appRoutes']).config(function(){
//      console.log("jfhc9ed ");
//  });
angular.module('userApp',['appRoutes','userControllers','userServices','mainController','authServices'])
.config(function($httpProvider){
    $httpProvider.interceptors.push('AuthInterceptors')
    });