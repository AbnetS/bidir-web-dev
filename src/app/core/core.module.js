(function(angular) {
  "use strict";

  angular
    .module("bidirApp.core", ["ngStorage"])
    .run(runBlock)
    .config(routeConfig);
  /** @ngInject */
  function runBlock() {
    console.log("core run");
  }
  /**@ngInject */
  function routeConfig($locationProvider, $urlRouterProvider, $httpProvider) {}
})(window.angular);
