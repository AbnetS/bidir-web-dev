(function(angular) {
  'use strict';
  var branch = {
      bindings: {
          resolve: '<',
          close: '&',
          dismiss: '&'
      },
      templateUrl: 'app/main/branches/branch.html',
      controller: 'BranchController',
      controllerAs: 'vm'
  };

  angular.module('bidirApp')
      .component('branch', branch);
})(window.angular);
