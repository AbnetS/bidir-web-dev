(function(angular) {
    'use strict';

    angular.module('components.auth')
        .controller('LoginController', LoginController);

    /**@ngInject */
    function LoginController(AuthService,$state) {
        var vm = this;
        vm.user = {};

        vm.loginUser = function() {
          $state.go('index.main');
        };


    }
})(window.angular);
