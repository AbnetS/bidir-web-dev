(function(angular) {
  "use strict";
  /**@ngInject */
  function BranchController(
    $state,
    AlertService,
    $scope,
    MainService,
    $uibModal,
    $log,
    $http,
    SweetAlert
  ) {
    var vm = this;
    vm.addBranch = addBranch;
    vm.editBranch = _editBranch;
    vm.changeStatus = _changeStatus;
    vm.search ='';
    vm.refresh =_refreshBranches;

    function _refreshBranches(){
      vm.search ='';
      getBranches();
    }

    vm.searchBranch = function(){
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
    };

    getBranches();

    function getBranches() {
      MainService.GetBranches().then(
        function(response) {
          vm.branches = response.data.docs;
          vm.branchesCopy = [].concat(vm.branches);
        },
        function(error) {
          console.log("error", error);
        }
      );
    }
    function searchBranches(){

    }

    function addBranch(size) {

      var modalInstance = $uibModal.open({
        component: "createbranch",
        size: "md"
      });

      modalInstance.result.then(
        function(branch) {
          //Save new branch API
          MainService.branches.save(
            branch,
            function(data) {
              // console.log("saved successfully", data);
              getBranches();
            },
            function(error) {
              console.log("could not be saved", error);
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
            opening_date: updatedBranch.opening_date,
            email: updatedBranch.email,
            phone: updatedBranch.phone
          };
          //Update branch api
          MainService.UpdateBranch(upBranch).then(
            function(response) {
              // console.log("updated successfully", response);
              getBranches();
            },
            function(error) {
              console.log("could not be updated", error);
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

  angular.module("bidirApp").controller("BranchController", BranchController);
})(window.angular);
