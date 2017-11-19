(function(angular) {
  "use strict";
  var branch = {
    templateUrl: "app/components/mfi_setup/branches/branches.html",
    controller: "BranchController",
    controllerAs: 'vm'
  };

  angular
    .module("bidirApp")
    .component("branch", branch)
    .config(routeConfig);
  /**@ngInject */
  function routeConfig($stateProvider) {
    var branches = {
      url: "/branches",
      title: "branches",
      component: "branch",
      data: { pageTitle: "Manage Branch", specialClass: "" }
    };

    $stateProvider.state("index.branch", branches);
  }
})(window.angular);
