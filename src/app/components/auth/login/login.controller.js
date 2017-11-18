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
        console.log("login controller");

        vm.loginUser = function() {
          AuthService.login(vm.user)
          .then(function(response) {
              console.log(response);
              var result = response.data;
              // console.log(result);
              vm.user = result.user;

        $rootScope.$broadcast(APP_CONSTANTS.AUTH_EVENTS.loginSuccess);
        AuthService.SetCredentials(response);
        toastr.success('Welcome ' + vm.user.admin.first_name +' '+ vm.user.admin.last_name+ ' to Bidir Web App','Success');
        $rootScope.$broadcast(APP_CONSTANTS.AUTH_EVENTS.loginSuccess);
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
