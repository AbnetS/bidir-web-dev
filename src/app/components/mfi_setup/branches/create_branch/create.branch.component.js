(function(angular) {
  'use strict';
  var branch = {
      bindings: {
          resolve: '<',
          close: '&',
          dismiss: '&'
      },
      templateUrl: 'app/components/mfi_setup/branches/create_branch/create.branch.html',
      controller: 'BranchController'
  };

  angular.module('bidirApp')
      .component('branch', branch);
})(window.angular);
