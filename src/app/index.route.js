(function() {
  'use strict';

  angular
    .module('bidirApp')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('index', {
        abstract: true,
        url: "/index",
        templateUrl: "app/components/common/content.html"
      })
      .state('index.main', {
        url: "/main",
        component:'mfi',
        data: { pageTitle: 'Home Page' }
      });

  }

})();
