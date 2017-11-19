(function(angular) {
    'use strict';
    angular.module('components.auth')

    .service('AuthService', AuthService);

    /**@ngInject */
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
            return !_.isUndefined(StorageService.Get(APP_CONSTANTS.StorageKey.SESSION)) ? StorageService.Get(APP_CONSTANTS.StorageKey.SESSION) : null;
        }

        function setCredentials(session) {
            return StorageService.Set(APP_CONSTANTS.StorageKey.SESSION, session);
        }

        function getToken() {
            return StorageService.Get(APP_CONSTANTS.StorageKey.SESSION).token;
        }

        function isAuthenticated() {
            var session = getCredentials();
            var loggedInUser = (_.isUndefined(session) || session === null) ? undefined : session;
            return (!_.isUndefined(loggedInUser));
        }
        function _getCurrentUser(){
          var credential = getCredentials();
          return _.isUndefined(credential) || credential === null ? null : credential.user;
        }

        function isAuthorized(roles) {
            if (!angular.isArray(roles)) {
                roles = [roles];
            }
            var credential = getCredentials();
            var session = _.isUndefined(credential) || credential === null ? null : getCredentials().user;
            var haveAccess = session !== null ? roles.indexOf(session.role) !== -1 : false;

            return isAuthenticated() && haveAccess;
        }

        function _login(user) {
          // return user.username === 'super@mfi.com' && user.password === 'mfipassword';
          return $http.post(CommonService.buildUrl(API.Service.Auth,API.Methods.Auth.Login), user);
        }

        function logout() {
            StorageService.Reset();
            $rootScope.$broadcast(APP_CONSTANTS.AUTH_EVENTS.logoutSuccess);
            console.log(APP_CONSTANTS.AUTH_EVENTS.logoutSuccess);
            $state.go('auth.login');
        }

    }

})(window.angular);
