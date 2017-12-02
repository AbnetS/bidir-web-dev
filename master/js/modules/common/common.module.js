(function(angular) {
  "use strict";

  angular
    .module("app.common", [])
    .run(runBlock)
    .config(routeConfig);

  function runBlock() {
    console.log("common run");
  }

  function routeConfig() {}
})(window.angular);
