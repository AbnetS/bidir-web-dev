(function() {
    'use strict';

    angular
        .module('custom', [
            // request the the entire framework
            'angle',
            'app.common',
            'app.authentication',
            'app.mfi',
            'app.manage_roles',
            'app.manage_users',
            'app.welcomePage',
            'app.clients',
            'app.forms',
            'app.acat',
            'app.loan_management'

        ]).config(customConfig)
        .run(customRun);

    function customRun($rootScope, AuthService, $http,$location){
        //TODO: redirect them to an access denied state if they do not have authorization to access it.
        console.log("angle app run");
        $rootScope.currentUser = AuthService.GetCurrentUser();


        //Angular UI router state changes
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {

            if ($rootScope.currentUser !== null) {
                $http.defaults.headers.common['Authorization'] = 'Bearer ' + AuthService.GetToken();
            }
            else{
                // console.log("tostate",toState);
                //Clear storage and redirect
                $location.path('/page/login');
            }
        });
    }
    function customConfig($mdAriaProvider,$mdThemingProvider) {
        $mdAriaProvider.disableWarnings();
        $mdThemingProvider.theme('default')
            .primaryPalette('blue');
    }
})();