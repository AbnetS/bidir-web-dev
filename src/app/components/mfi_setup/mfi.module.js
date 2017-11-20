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
function routeConfig(uiMaskConfigProvider,$httpProvider) {
  console.log("uiMaskConfigProvider",uiMaskConfigProvider);
  // uiMaskConfigProvider.clearOnBlur(false);
  // uiMaskConfigProvider.eventsToHandle(['input', 'keyup', 'click']);
  uiMaskConfigProvider.allowInvalidValue = true;
}

})();
