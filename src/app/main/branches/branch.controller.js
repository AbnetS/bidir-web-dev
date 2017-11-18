// (function(angular) {
//   'use strict';

//   function BranchController() {
//       var ctrl = this;
//       ctrl.branch = ctrl.resolve.branch;

//       ctrl.$onInit = function() {
//         console.log("branch init");
//       };

//       ctrl.ok = function() {
//         ctrl.close({ $value: ctrl.branch });
//       };

//       ctrl.cancel = function() {
//         ctrl.dismiss({ $value: 'cancel' });
//       };
//   }


//   angular.module('bidirApp')
//       .controller('BranchController', BranchController);
// })(window.angular);
