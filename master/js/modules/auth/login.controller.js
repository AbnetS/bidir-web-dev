/**=========================================================
 * Module: access-login.js
 * Demo for login api
 =========================================================*/

(function(angular) {
    "use strict";

    angular
        .module('app.auth')
        .controller('LoginFormController', LoginFormController);

    LoginFormController.$inject = ['AuthService',
        '$scope',
        '$state',
        '$rootScope',
        'APP_CONSTANTS',
        'toaster'
        ];

    function LoginFormController(
        AuthService,
        $scope,
        $state,
        $rootScope,
        APP_CONSTANTS,
        toaster
    ) {
        var vm = this;
        vm.userValidator = {
            usernameMin: 4,
            usernameMax: 20,
            passwordMin: 6
        };
        vm.user = {};

        vm.login = function() {
            AuthService.login(vm.user).then(
                function(response) {
                    var result = response.data;
                    vm.user = result.user;

                    $rootScope.$broadcast(APP_CONSTANTS.AUTH_EVENTS.loginSuccess);
                    AuthService.SetCredentials(result);

                    console.log(APP_CONSTANTS.AUTH_EVENTS.loginSuccess);
                    $state.go("app.welcome");
                    // CheckMFIAndRedirect();
                },
                function(error) {
                    console.log("error", error);
                    toaster.pop("success", "ERROR", "The username or password is incorrect! Please try again.");
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

