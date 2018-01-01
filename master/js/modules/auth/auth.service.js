(function(angular) {
    'use strict';
    angular.module('app.auth')

    .service('AuthService', AuthService);

     AuthService.$inject = ['$http', 'StorageService', 'CommonService', 'APP_CONSTANTS', '$rootScope', '$state'];

    function AuthService($http, StorageService, CommonService, APP_CONSTANTS, $rootScope, $state) {

        var service = {
            login: _login,
            Logout: logout,
            GetCredentials: getCredentials,
            SetCredentials: setCredentials,
            GetToken: getToken,
            IsAuthenticated: isAuthenticated,
            IsAuthorized: isAuthorized,
            GetCurrentUser:_getCurrentUser
        };

        return service;

        function getCredentials() {
            return !angular.isUndefined(StorageService.Get(APP_CONSTANTS.StorageKey.SESSION)) ? StorageService.Get(APP_CONSTANTS.StorageKey.SESSION) : null;
        }

        function setCredentials(session) {
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + session.token;
            return StorageService.Set(APP_CONSTANTS.StorageKey.SESSION, session);
        }

        function getToken() {
            return StorageService.Get(APP_CONSTANTS.StorageKey.SESSION).token;
        }

        function isAuthenticated() {
            var session = getCredentials();
            var loggedInUser = (angular.isUndefined(session) || session === null) ? undefined : session;
            return (!angular.isUndefined(loggedInUser));
        }
        function _getCurrentUser(){
          var credential = getCredentials();
          return credential !== null? credential.user: null;
        }

        function isAuthorized(roles) {
            if (!angular.isArray(roles)) {
                roles = [roles];
            }
            var credential = getCredentials();
            var session = angular.isUndefined(credential) || credential === null ? null : getCredentials().user;
            var haveAccess = session !== null ? roles.indexOf(session.role) !== -1 : false;

            return isAuthenticated() && haveAccess;
        }

        function _login(user) {
          return $http.post(CommonService.buildUrl(API.Service.Auth,API.Methods.Auth.Login), user);
        }

        function logout() {
            StorageService.Reset();
            $rootScope.currentUser = null;
            $rootScope.$broadcast(APP_CONSTANTS.AUTH_EVENTS.logoutSuccess);
            $state.go('page.login');
        }

    }

})(window.angular);
