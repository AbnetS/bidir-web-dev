(function(angular) {
    'use strict';

    angular.module('bidirApp.core', [])
        .config(routeConfig);

    /**@ngInject */
    function routeConfig($locationProvider, $urlRouterProvider, $httpProvider) {}

})(window.angular);