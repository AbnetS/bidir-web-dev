(function(angular) {
  'use strict';
  /**@ngInject */
  function CreateBranchController(CommonService,toastr) {
      var ctrl = this;
      ctrl.MFIBranchForm = {
        IsnameValid: true,
        IslocationValid: true
    };
    ctrl.branchTypes =[  'Satellite office','Rural Service','Satellite office'];

      ctrl.branch = ctrl.resolve.branch;
      ctrl.emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      ctrl.$onInit = function() {
        // console.log("branch init");
      };

      ctrl.ok = function() {
        ctrl.IsValidData = CommonService.Validation.ValidateForm(ctrl.MFIBranchForm, ctrl.branch);
        if(ctrl.IsValidData){
          ctrl.close({ $value: ctrl.branch });
        }else{
          toastr.warning("Please fill the required fields and try again.", "Warning!");
        }
      };

      ctrl.cancel = function() {
        ctrl.dismiss({ $value: 'cancel' });
      };
  }


  angular.module('bidirApp')
      .controller('CreateBranchController', CreateBranchController);
})(window.angular);
