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
    "components",
    "bidirApp.home"
  ]).run(runBlock);

    /** @ngInject */
    function runBlock($log) {
        console.log("bidirApp run")
      $log.debug('runBlock end');
    }
})();
