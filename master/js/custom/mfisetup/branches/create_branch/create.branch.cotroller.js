(function(angular) {
  'use strict';

    angular.module('app.mfi')
        .controller('CreateBranchController', CreateBranchController);

    CreateBranchController.$inject = ['$mdDialog','items','AlertService','CommonService','MainService'];

  function CreateBranchController($mdDialog, items,AlertService,CommonService,MainService) {
      var vm = this;
      vm.cancel = _cancel;
      vm.saveBranch = _saveBranch;
      vm.isEdit = items !== null;
      vm.branch = items !== null?items:null;
      vm.MFIBranchForm = {
          IsnameValid: true,
          IslocationValid: true
      };
      init();

      function _saveBranch() {

          vm.IsValidData = CommonService.Validation.ValidateForm(vm.MFIBranchForm, vm.branch);
          if(vm.branchForm.inputEmail.$error.email){
              AlertService.showWarning("Branch validation failed","Please provide valid email address");
          }else if(vm.IsValidData){
              if(!vm.isEdit){
                  //Save new branch API
                  MainService.CreateBranch(vm.branch).then(
                      function(data) {
                          $mdDialog.hide();
                          AlertService.showSuccess(
                              "Saved! Branch saved successfully.",
                              "SUCCESS"
                          );
                      },
                      function(response) {
                          var message = response.data.error.message;
                          console.log("could not be saved", response.data);
                          AlertService.showError(
                              "ERROR",
                              "Could not be saved!, " + message
                          );
                      }
                  )
              }else {
                  debugger
                  var upBranch = {
                      _id: vm.branch._id,
                      name: vm.branch.name,
                      location: vm.branch.location,
                      branch_type: vm.branch.branch_type,
                      opening_date: vm.branch.opening_date
                  };
                      if(!_.isUndefined(vm.branch.email)){
                        upBranch.email =vm.branch.email;
                      }
                      if(_.isString(vm.branch.phone) && vm.branch.phone !== ""){
                        upBranch.phone =vm.branch.phone;
                      }
                      //Update branch api
                      MainService.UpdateBranch(upBranch).then(
                        function(response) {
                          AlertService.showSuccess(
                            "Branch Updated",
                            "Branch updated successfully."
                          );
                          $mdDialog.hide();
                        },
                        function(response) {
                            var message = response.data.error.message;
                          console.log("could not be updated", response.data);
                          AlertService.showError(
                              "Could not update Branch",
                              message
                          );
                        }
                      );

              }

          } else {
              AlertService.showError("Failed to create branch","Please fill the required fields and try again.");
          }
      }

      vm.clear = function() {
          vm.dt = null;
      };
      vm.dateOptions = {
          dateDisabled: false,
          formatYear: "yy",
          maxDate: new Date(2020, 5, 22),
          startingDay: 1
      };
      vm.openDatePicker = function() {
          vm.popup1.opened = true;
      };
      vm.format = "dd-MMMM-yyyy";
      vm.altInputFormats = ["d!/M!/yyyy"];
      vm.popup1 = {
          opened: false
      };

      function _cancel() {
          $mdDialog.cancel();
      }
      function init(){
          vm.branchTypes =['Satellite office','Rural Service','Regional office','Urban office'];
          if(vm.isEdit)
          {
              var dt =_.isUndefined(vm.branch.opening_date)?undefined: new Date(vm.branch.opening_date);
              vm.branch.opening_date = dt;
          }
      }
  }



})(window.angular);
