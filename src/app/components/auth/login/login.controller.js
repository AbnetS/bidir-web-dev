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
            if(AuthService.login(vm.user)){
              $state.go('index.main');
            }else{
              console.log(vm.user);
              _.isEmpty(vm.user)?
                  toastr.error('username and password is required!','ERROR!'):
                  toastr.error('The username or password is incorrect! Please try again.','ERROR!');
              // AlertService.showError('The username or password is incorrect','Error');
            }
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

        };



    }
})(window.angular);
