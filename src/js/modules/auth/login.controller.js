/**=========================================================
 * Module: access-login.js
 * Demo for login api
 =========================================================*/

(function(angular) {
    "use strict";

    angular
        .module('app.auth')
        .controller('LoginFormController', LoginFormController);

    LoginFormController.$inject = ['AuthService', '$state',  '$rootScope',  'APP_CONSTANTS',  'blockUI', 'AlertService'];

    function LoginFormController( AuthService,  $state, $rootScope,  APP_CONSTANTS, blockUI,AlertService
    ) {
        var vm = this;
        vm.userValidator = {
            usernameMin: 4,
            usernameMax: 20,
            passwordMin: 6
        };
        vm.user = {};

        vm.login = function() {
            var myBlockUI = blockUI.instances.get('loginFormBlockUI');
            myBlockUI.start("Login Loading");
            AuthService.login(vm.user).then(
                function(response) {
                    var result = response.data;
                    vm.user = result.user;
                    $rootScope.currentUser = vm.user;
                    $rootScope.$broadcast(APP_CONSTANTS.AUTH_EVENTS.loginSuccess);
                    AuthService.SetCredentials(result);
                    myBlockUI.stop();
                    console.log('logged in user',vm.user);

                    $state.go("app.welcome");
                    //TODO: if no mfi redirect to mfi registration page
                    // CheckMFIAndRedirect();
                },
                function(error) {
                    myBlockUI.stop();
                    console.log("error", error);
                    AlertService.showError("Error on Login", "The username or password is incorrect! Please try again.");
                    $rootScope.$broadcast(APP_CONSTANTS.AUTH_EVENTS.loginFailed);
                }
            );

            function CheckMFIAndRedirect(){
                MainService.GetMFI().then(
                    function(response) {
                        debugger
                        if (response.data.length > 0) {
                            $state.go("index.branch");
                            toastr.success(
                                "Welcome Back " +
                                vm.user.admin.first_name ,
                                "Success"
                            );
                        }else{
                            $state.go("home.mfi");
                            toastr.success(
                                "Welcome " +
                                vm.user.admin.first_name +
                                " " +
                                vm.user.admin.last_name +
                                " to Bidir Web App",
                                "Success"
                            );
                        }
                    },
                    function(error) {
                        console.log("error", error);
                        toastr.error(
                            "Error occured while trying to connect! Please try again.",
                            "ERROR!"
                        );
                    }
                );
            }

        };
    }
})(window.angular);

