/*!
 * 
 * Angle - Bootstrap Admin App + AngularJS Material
 * 
 * Version: 3.8.1
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: https://wrapbootstrap.com/help/licenses
 * 
 */

// APP START
// ----------------------------------- 

(function() {
    'use strict';

    angular
        .module('angle', [
            'app.core',
            'app.routes',
            'app.sidebar',
            'app.navsearch',
            'app.preloader',
            'app.loadingbar',
            'app.translate',
            'app.settings',
            'app.maps',
            'app.utils',
            'app.material',
            'app.common',
            'app.auth',
            'app.manage_users',
            'app.manage_roles',
            'app.welcomePage',
            'app.mfi'
        ]).run(appRun);

    function appRun($rootScope, AuthService, $http,$state,$location){
            //TODO: redirect them to an access denied state if they do not have authorization to access it.
            $rootScope.currentUser = AuthService.GetCurrentUser();
           

        //Angular UI router state changes
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
            
            if ($rootScope.currentUser !== null) {
                $http.defaults.headers.common['Authorization'] = 'Bearer ' + $rootScope.currentUser.token;
            }else{
                //Clear storage and redirect
                $location.path('/page/login');
            }
        });
    }
        
})();

