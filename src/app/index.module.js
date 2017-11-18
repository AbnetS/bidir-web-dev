(function() {
  "use strict";

  angular.module("bidirApp", [
    "ngAnimate",
    "ngCookies",
    "ngTouch",
    "ngSanitize",
    "ngMessages",
    "ngAria",
    "ngResource",
    "ui.router",
    "ui.bootstrap",
    "angular-loading-bar",
    "oitozero.ngSweetAlert",
    "ngStorage",
    "toastr",
    "ngFileUpload",
    'smart-table',


    "bidirApp.core",
    "components",
    "bidirApp.home"
  ]).run(runBlock).config(appConfig);

    /** @ngInject */
    function runBlock($log) {
        console.log("bidirApp run")
      $log.debug('runBlock end');
    }
    /** @ngInject */
    function appConfig($httpProvider){
      $httpProvider.interceptors.push('AuthInterceptor');
    }
})();
