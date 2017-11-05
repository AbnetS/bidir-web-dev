(function() {
  "use strict";

  angular.module("bidirApp.home", [
    "ui.router",
  ]).run(runBlock)
  .config(routeConfig);
/** @ngInject */
function runBlock() {
  console.log("home run");
}
/**@ngInject */
function routeConfig($locationProvider, $urlRouterProvider, $httpProvider) {}
})();
