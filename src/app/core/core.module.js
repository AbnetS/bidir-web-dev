(function(angular) {
    'use strict';

    angular.module('core', [
      'ngStorage'
    ])
        .config(routeConfig);

    /**@ngInject */
    function routeConfig($locationProvider, $urlRouterProvider, $httpProvider) {}

})(window.angular);
