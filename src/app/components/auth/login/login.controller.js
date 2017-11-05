(function(angular) {
    'use strict';

    angular.module('components.auth')
        .controller('LoginController', LoginController);

    /**@ngInject */
    function LoginController(AuthService,$scope,$state,$rootScope,APP_CONSTANTS) {
        var vm = this;
        vm.user = {};

        vm.loginUser = function() {
          // AuthService.login(vm.user)
          // .then(function(response) {
          //     console.log(result);
          //     // vm.user = result.user;
          //     // $rootScope.session = result;

          //     // $rootScope.$broadcast(APP_CONSTANTS.AUTH_EVENTS.loginSuccess);
          //     // console.log(APP_CONSTANTS.AUTH_EVENTS.loginSuccess);
          //     // $state.go('index.main');

          // }, function(error) {
          //     // var errorMessage = error.data;
          //     console.log("error",error);
          //     // toastr.error('ERROR! ' + errorMessage.messagee);
          //     $rootScope.$broadcast(APP_CONSTANTS.AUTH_EVENTS.loginFailed);
          // });
          $state.go('index.main');
        };



    }
})(window.angular);
