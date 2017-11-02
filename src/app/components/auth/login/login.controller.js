(function(angular) {
    'use strict';

    angular.module('bidirApp.components.auth')
        .controller('LoginController', LoginController);

    /**@ngInject */
    function LoginController($state, $scope, StorageService, AuthService, APP_CONSTANTS, $rootScope) {
        var vm = this;


        vm.login = function() {

        };


    }
})(window.angular);
