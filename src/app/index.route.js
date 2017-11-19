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
      })
      .state('home', {
        abstract: true,
        url: "/home",
        template: '<div ui-view></div>'
      })
      .state('home.mfi', {
        url: "/mfi",
        component:'main',
        data: { pageTitle: 'MFI Registration' }
      });

  }

})();
