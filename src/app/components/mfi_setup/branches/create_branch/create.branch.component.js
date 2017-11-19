(function(angular) {
  'use strict';
  var createbranch = {
      bindings: {
          resolve: '<',
          close: '&',
          dismiss: '&'
      },
      templateUrl: 'app/components/mfi_setup/branches/create_branch/create.branch.html',
      controller: 'CreateBranchController'
  };

  angular.module('bidirApp')
      .component('createbranch', createbranch);
})(window.angular);
