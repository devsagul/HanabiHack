/**
 * Created by buyvich on 01.09.14.
 */

angular
    .module("MainApp", ["ngGrid", "ngRoute"])
    .config(function($interpolateProvider, $httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.xsrfHeaderName = 'X-XSRFToken';
        $httpProvider.defaults.xsrfCookieName = '_xsrf';
    })
    .controller("TngGreed", ["$scope", "$http", "$route", TngGreed])
    .controller("CurrentWeek", ["$scope", "$http", "$route", CurrentWeek]);

function TngGreed($scope, $http){

    $scope.trainings = [];
    $scope.trainingForm = {};

    $scope.gridOptions = {
        data: 'trainings',
        columnDefs: [
            {field:'name', displayName:'Название'},
            {field:'goal', displayName:'Цель'},
            {field: 'units', displayName: 'Единицы измерения'}
        ],
        showFooter: true,
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEdit: true
    };

    $scope.loadTrainings = function(){
        console.debug('initialize all trainings list');
        $http.get('/training/').
            success(function(data){
                $scope.trainings = angular.fromJson(data);
            })
            .error(function(){
                console.error('got error');
            });
    };

    $scope.addTraining = function() {
        console.log("--> Submitting form");
        $http.post('/training/', $scope.trainingForm, {});
    };

    console.debug('initialize trainings ctrl');
    $scope.loadTrainings();
}

function CurrentWeek($scope, $http){

    $scope.trainings = [];

    $scope.gridOptions = {
        data: 'trainings',
        columnDefs: [
            {field:'name', displayName:'Название'},
            {field:'goal', displayName:'Цель'},
            {field: 'tng_type', displayName: 'Тип'}
        ],
        showFooter: true,
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEdit: true
    };



    $scope.loadTrainings = function(){
        console.debug('initialize trainings list');
        console.debug($http.defaults);
        $http.get('/training/').
            success(function(data){
                $scope.trainings = angular.fromJson(data);
            })
            .error(function(){
                console.error('got error');
            });
    };

    console.debug('initialize week ctrl');
    $scope.loadTrainings();
}
