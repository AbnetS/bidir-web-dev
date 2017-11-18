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


    "bidirApp.core",
    "components"
  ]).run(runBlock)
  .config(appConfig);

    /** @ngInject */
    function runBlock($log) {
        console.log("bidirApp run");
    }
    /** @ngInject */
    function appConfig($httpProvider){
      // $httpProvider.interceptors.push('AuthInterceptor');
    }

})();
