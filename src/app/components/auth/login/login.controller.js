(function(angular) {
    'use strict';

    angular.module('bidirApp.components.auth')
        .controller('LoginController', LoginController);

    /**@ngInject */
    function LoginController() {
        var vm = this;

        vm.login = function() {
            console.log("login test");
        };


    }
})(window.angular);
