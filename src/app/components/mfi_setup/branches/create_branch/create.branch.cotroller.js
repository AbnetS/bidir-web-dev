(function(angular) {
  'use strict';
  /**@ngInject */
  function CreateBranchController(CommonService,toastr,$scope) {
      var ctrl = this;
      ctrl.MFIBranchForm = {
        IsnameValid: true,
        IslocationValid: true
    };
    ctrl.branchTypes =[  'Satellite office','Rural Service','Satellite office'];

      ctrl.branch = ctrl.resolve.branch;
      ctrl.emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

      ctrl.$onInit = function() {
        if(!_.isUndefined(ctrl.branch))
        {
        var dt =_.isUndefined(ctrl.branch.opening_date)?undefined: new Date(ctrl.branch.opening_date);
          ctrl.branch.opening_date = dt;
        }
      };

      ctrl.ok = function() {
        ctrl.IsValidData = CommonService.Validation.ValidateForm(ctrl.MFIBranchForm, ctrl.branch);

        if($scope.branchForm.inputEmail.$error.email){
          toastr.warning("The email address you put is invalid.", "Warning!");
        }else if(ctrl.IsValidData){
          console.log("ctrl.branch",ctrl.branch);
          ctrl.close({ $value: ctrl.branch });
        } else{
          toastr.warning("Please fill the required fields and try again.", "Warning!");
        }
      };

      ctrl.cancel = function() {
        ctrl.dismiss({ $value: 'cancel' });
      };

      $scope.clear = function() {
        $scope.dt = null;
      };

      $scope.dateOptions = {
        dateDisabled: false,
        formatYear: "yy",
        maxDate: new Date(2020, 5, 22),
        startingDay: 1
      };

      $scope.open1 = function() {
        $scope.popup1.opened = true;
      };

      $scope.format = "dd-MMMM-yyyy";
      $scope.altInputFormats = ["M!/d!/yyyy"];

      $scope.popup1 = {
        opened: false
      };
  }


  angular.module('bidirApp')
      .controller('CreateBranchController', CreateBranchController);
})(window.angular);
