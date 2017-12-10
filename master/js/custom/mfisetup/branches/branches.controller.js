(function(angular) {
  "use strict";

    angular.module("app.mfi").controller("BranchController", BranchController);

    BranchController.$inject = ['$state','$uibModal','MainService'];

  function BranchController(
    $state,
    $uibModal,
    MainService
  ) {
    var vm = this;
    vm.title = "Manage Branch";

    vm.addBranch = addBranch;
    vm.editBranch = _editBranch;
    vm.changeStatus = _changeStatus;
    vm.search ='';
    vm.refresh =_refreshBranches;
    vm.searchBranch = _searchBranches;

    function _refreshBranches(){
      vm.search ='';
      getBranches();
    }

     getBranches();

    function getBranches() {
      MainService.GetMFI().then(
        function(response) {
          console.log("mfi data",response);
          vm.mfi = response.data[0];
          vm.branches = response.data[0].branches;
          vm.branchesCopy = [].concat(vm.branches);
        },
        function(error) {
          console.log("error", error);
        }
      );

    }
    function _searchBranches(){
      MainService.SearchBranch(vm.search).then(
        function(response) {
          console.log("response", response);
          vm.branches = response.data.branches;
          vm.branchesCopy = [].concat(vm.branches);
        },
        function(error) {
          console.log("error", error);
        }
      );
    }

    function addBranch(size) {

      var modalInstance = $uibModal.open({
          templateUrl: 'master/js/custom/mfisetup/branches/create_branch/create.branch.html',

          controller: 'CreateBranchController',
        size: "md",
          bindings: {
              resolve: '<',
              close: '&',
              dismiss: '&'
          }
      });

      modalInstance.result.then(
        function(branch) {
          branch.MFI = vm.mfi._id;
          //Save new branch API
          MainService.CreateBranch(
            branch,
            function(data) {
              debugger
               // console.log("saved successfully", data);
              AlertService.showSuccess(
                "Saved! Branch saved successfully.",
                "SUCCESS"
              );
              getBranches();
            },
            function(error) {
              console.log("could not be saved", error);
              AlertService.showError(
                "Could not be saved!, " + error.data.specific_errors.message,
                "ERROR"
              );
            }
          );
        },
        function() {
          // $log.info("modal-component dismissed at: " + new Date());
        }
      );
    }

    function _editBranch(selectedBranch) {
      var modalInstance = $uibModal.open({
        component: "createbranch",
        size: "md",
        resolve: {
          branch: function() {
            return selectedBranch;
          }
        }
      });

      modalInstance.result.then(
        function(updatedBranch) {
          var upBranch = {
            _id: updatedBranch._id,
            name: updatedBranch.name,
            location: updatedBranch.location,
            branch_type: updatedBranch.branch_type,
            opening_date: updatedBranch.opening_date
          };
          if(!_.isUndefined(updatedBranch.email)){
            upBranch.email =updatedBranch.email;
          }
          if(_.isString(updatedBranch.phone) && updatedBranch.phone !== ""){
            upBranch.phone =updatedBranch.phone;
          }
          //Update branch api
          MainService.UpdateBranch(upBranch).then(
            function(response) {
              AlertService.showSuccess(
                "Updated! Branch updated successfully.",
                "SUCCESS"
              );
              getBranches();
            },
            function(error) {
              console.log("could not be updated", error);
              getBranches();
              AlertService.showError(
                "Could not be updated!, " + error.data.specific_errors[0].message,
                "ERROR"
              );
            }
          );
        },
        function() {
          // $log.info("modal-component dismissed without any change");
        }
      );
    }

    function _changeStatus(ChangeStatus) {
      ChangeStatus.status = ChangeStatus.status === "active" ? "inactive" : "active";
      MainService.ChangeStatus(ChangeStatus).then(
        function(response) {

          AlertService.showSuccess(
            "Updated! Status changed successfully.",
            "SUCCESS"
          );
          // console.log("updated successfully", response);

        },
        function(error) {
          // console.log("could not be updated", error);
          AlertService.showError(
            "Status not changed. Please try again.",
            "ERROR"
          );
        }
      );

    }

  }
})(window.angular);
