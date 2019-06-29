import angular from 'angular';
import uiRouter from 'angular-ui-router';
import projectsComponent from './projects.component';

let projectsModule = angular.module('home.projects', [
  uiRouter
])

.config($stateProvider => {
  'ngInject';
  $stateProvider.state('home.projects', {
    url      : '/projects',
    template : '<projects></projects>'
  });
})

.component('projects', projectsComponent);

export default projectsModule;
