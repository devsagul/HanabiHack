"use strict";

angular.module('angFire.register', ['ngRoute', 'firebase'])

// Declared route
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'register/register.html',
    controller: 'RegisterCtrl'
  });
}])

// Register controller
.controller('RegisterCtrl', ['$scope', '$location', '$firebaseAuth', function($scope, $location, $firebaseAuth) {

  var firebaseObj = new Firebase('https://jaredwilli.firebaseio.com');
  var auth = $firebaseAuth(firebaseObj);

  $scope.register = function() {
    if ($scope.registerForm.$valid) {
      var email = $scope.user.email;
      var password = $scope.user.password;

      if (email && password) {
        auth.$createUser(email, password).then(function() {
          console.log('User created');
          $location.path('/home');
        }, function(error) {
          console.log('Error creating user', error);
          $scope.regError = true;
          $scope.regErrorMsg = error.message;
        });
      }
    }
  };

}]);
