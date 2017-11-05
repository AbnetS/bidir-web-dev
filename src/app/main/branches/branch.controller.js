(function(angular) {
  'use strict';

  function BranchController() {
      var ctrl = this;
      ctrl.branch = ctrl.resolve.branch;

      ctrl.$onInit = function() {
        console.log("branch init");
      };

      ctrl.ok = function() {

        console.log("ok clicked on branch controller");
        ctrl.close({ $value: ctrl });

      };

      ctrl.cancel = function() {
        ctrl.dismiss({ $value: 'cancel' });
      };
  }


  angular.module('bidirApp')
      .controller('BranchController', BranchController);
})(window.angular);
