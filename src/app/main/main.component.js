(function(angular) {
  'use strict';
  var main = {
      templateUrl: "app/main/main.html",
      controller: 'MainController',
      controllerAs: 'vm'
  };

  angular.module('bidirApp')
      .component('main', main)
      .config(routeConfig);

  /**@ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

  }

})(window.angular);
