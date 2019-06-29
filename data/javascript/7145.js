angular.module('abs.coreLayout')
    .directive('appNavigation', function() {
        return {
            restrict: 'A',
            templateUrl: 'shared-views/navigation.html',
            controller: 'LayoutController',
            controllerAs: 'vm',
            replace: true
        };
    });