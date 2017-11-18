(function(angular) {
  'use strict';
  angular.module('bidirApp.core')
      .factory('AuthInterceptor', AuthInterceptor);

  /**@ngInject */
  function AuthInterceptor($window, $q, $rootScope, StorageService, APP_CONSTANTS) {
      return {
          request: function(config) {
            console.log("request config",config);
              config.headers = config.headers || {};
              var token = 'Bearer ' + StorageService.Get(APP_CONSTANTS.StorageKey.SESSION).token;
              if (token) {
                  console.log("token from AuthInterceptor", token);
                  // config.headers['Authorization'] = token;
                  config.headers.Authorization = token;
              }
              return config;
          },
          response: function(response) {
              $rootScope.$broadcast({
                  401: APP_CONSTANTS.AUTH_EVENTS.notAuthenticated,
                  403: APP_CONSTANTS.AUTH_EVENTS.notAuthorized,
                  419: APP_CONSTANTS.AUTH_EVENTS.sessionTimeout,
                  440: APP_CONSTANTS.AUTH_EVENTS.sessionTimeout
              }[response.status], response);
              return $q.reject(response);
          }
      };
  }

})(window.angular);
