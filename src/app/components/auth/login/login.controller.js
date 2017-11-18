(function(angular) {
    'use strict';

    angular.module('components.auth')
        .controller('LoginController', LoginController);

    /**@ngInject */
    function LoginController(AuthService,$scope,$state,$rootScope,APP_CONSTANTS,toastr,AlertService,_) {
        var vm = this;
        vm.userValidator = {
          usernameMin: 4,
          usernameMax: 20,
          passwordMin: 6
      };
        vm.user = {};

        vm.loginUser = function() {
          AuthService.login(vm.user)
          .then(function(response) {
              var result = response.data;
              vm.user = result.user;

        $rootScope.$broadcast(APP_CONSTANTS.AUTH_EVENTS.loginSuccess);
        AuthService.SetCredentials(result);
        toastr.success('Welcome ' + vm.user.admin.first_name +' '+ vm.user.admin.last_name+ ' to Bidir Web App','Success');
        console.log(APP_CONSTANTS.AUTH_EVENTS.loginSuccess);
        $state.go('index.main');
      }, function(error) {
        console.log("error",error);
        toastr.error('The username or password is incorrect! Please try again.','ERROR!');
        $rootScope.$broadcast(APP_CONSTANTS.AUTH_EVENTS.loginFailed);
    });
        };



    }
})(window.angular);
