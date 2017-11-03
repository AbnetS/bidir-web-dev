(function(angular) {
    'use strict';

    angular.module('core', [])
        .config(routeConfig);

    /**@ngInject */
    function routeConfig($locationProvider, $urlRouterProvider, $httpProvider) {}

})(window.angular);
