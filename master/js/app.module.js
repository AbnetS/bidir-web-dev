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

    function appRun($rootScope, AuthService, $http,$state){
            //TODO: redirect them to an access denied state if they do not have authorization to access it.
        //Angular UI router state changes
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {

            var UserInfo = AuthService.GetCredentials();
            //Check if there is a logged in user
            if (UserInfo !== null) {
                $http.defaults.headers.common['Authorization'] = 'Bearer ' + UserInfo.token;

            }else{
                //Clear storage and redirect
                $state.go('page.login');
            }
        });
    }
        
})();

