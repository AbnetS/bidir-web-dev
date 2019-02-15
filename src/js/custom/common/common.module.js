(function(angular) {
  "use strict";

  angular
    .module("app.common", ['toaster'])
      .config(routeConfig)
      .run(runBlock);

  function runBlock() {}
  function routeConfig() {}

})(window.angular);
