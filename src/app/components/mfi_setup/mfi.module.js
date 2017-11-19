(function() {
  "use strict";

  angular.module("components.mfi", [
    "ui.router",
    "ui.mask"
  ]).run(runBlock)
  .config(routeConfig);

  /** @ngInject */
function runBlock() {
  console.log("mfi run");
}
/**@ngInject */
function routeConfig($locationProvider,$httpProvider) {}

})();
