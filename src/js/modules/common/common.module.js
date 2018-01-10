(function(angular) {
  "use strict";

  angular
    .module("app.common", [])
      .config(routeConfig)
      .run(runBlock);

  function runBlock() {
    console.log("common run");
  }

  function routeConfig() {console.log("common config");}
})(window.angular);
