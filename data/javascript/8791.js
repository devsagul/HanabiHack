var app = angular.module('hiScoreApp', []);

  app.config(function($httpProvider) {
      //Enable cross domain calls
      $httpProvider.defaults.useXDomain = true;
      //Remove the header used to identify ajax call  that would prevent CORS from working
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
  });

  app.controller('HiScoreCtrl', ['$scope', '$http', function($scope, $http){
    $scope.scores = [];

    var config =
    {
      method: 'GET',
      url: 'https://still-sea-1226.herokuapp.com/scores',
      dataType: 'jsonp',
      headers:
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }

    function loadHiScores()
    {
      $http(config).
      success(function(data){
        console.log(data);
        $scope.scores = data;
      });
    }

    // dummy data
    // $scope.scores = [{name: "Harriet", time: 50, createdAt: new Date().getTime()-1000000},{name: "Piet", time: 100, createdAt: new Date().getTime()}]
    $scope.predicate = 'time';
    loadHiScores();
  }])
