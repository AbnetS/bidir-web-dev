/**
 *
 * @ngdoc module
 * @name components.auth
 *
 * @requires ui.router
 *
 * @description
 *
 * This is the auth module. It includes our auth components
 *
 **/
(function(angular) {
  "use strict";

  angular.module("components.auth", ["ui.router","toastr"]).run(runBlock);

  /** @ngInject */
  function runBlock() {
    console.log("auth run");
  }
})(window.angular);
