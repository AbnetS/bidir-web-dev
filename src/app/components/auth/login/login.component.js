(function(angular) {
    'use strict';
    var login = {
        templateUrl: 'app/components/auth/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm',
        bindings: {
            user: '<'
        }
    };

    angular.module('components.auth')
        .component('login', login)
        .config(routeConfig);

    /**@ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('auth/login');

        var auth = {
            redirectTo: 'auth.login',
            url: '/auth',
            template: '<div ui-view></div>',
            data: { pageTitle: 'Login', specialClass: 'gray-bg' }
        };
        var login = {
            url: '/login',
            title: 'login',
            component: 'login',
            data: { pageTitle: 'Login', specialClass: 'gray-bg' }
        };

        $stateProvider
            .state('auth', auth)
            .state('auth.login', login);
    }

})(window.angular);
