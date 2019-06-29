'use strict';

angular.module('myApp.templates',['ngRoute'])
.config(['$routeProvider',function($routeProvider){
    $routeProvider
        .when('/templates', {
            templateUrl:'templates/templates.html',
            controller:'TemplateController'
    })
        .when('/templates/:templateId', {
            templateUrl:'templates/templatesDetails.html',
            controller:'TemplateDetailsController'
    })
    
    
}])
.controller('TemplateController',['$scope','$http',function($scope,$http){
    $http.get('json/templates.json').success(function(data){
        $scope.templates = data;
    });
}])
.controller('TemplateDetailsController',['$scope',
                                         '$http',
                                         '$routeParams',
                                         '$filter',
                                         function($scope,$http,$routeParams,$filter){
    var templateId = $routeParams.templateId;
    $http.get('json/templates.json').success(function(data){
        $scope.template = $filter('filter')(data,{id:templateId})[0];
        $scope.mainImage = $scope.template.images[0].name;
        $scope.setImage = function(image){
            $scope.mainImage = image.name;
        }
    })
                                             
}])