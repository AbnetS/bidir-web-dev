(function(angular) {
  'use strict';

  function BranchController() {
      var vm = this;
      console.log("ok clicked on branch controller");

      vm.$onInit = function() {
        console.log("branch init");
      };

      vm.ok = function() {
        console.log("ok clicked on branch controller");
          vm.close({ $value: vm });

      };

      vm.cancel = function() {
          vm.dismiss({ $value: 'cancel' });
      };
  }


  angular.module('bidirApp')
      .controller('BranchController', BranchController);
})(window.angular);
