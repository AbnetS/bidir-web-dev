(function(angular) {
  "use strict";

    angular.module("app.mfi").controller("BranchController", BranchController);

    BranchController.$inject = ['RouteHelpers','$mdDialog','MainService','AlertService'];

  function BranchController(RouteHelpers, $mdDialog, MainService,AlertService) {
    var vm = this;

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
          // console.log("mfi data",response);
          vm.mfi = response.data[0];
          vm.branches = response.data[0].branches;
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

    function addBranch(ev) {
        $mdDialog.show({
            locals: {items: null},
            templateUrl: RouteHelpers.basepath('mfisetup/branches/create.branch.dialog.html'),
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false,
            hasBackdrop: false,
            escapeToClose: true,
            controller: 'CreateBranchController',
            controllerAs: 'vm'
        }).then(function (answer) {
            getBranches();
        }, function () {
        });

    }

    function _editBranch(selectedBranch,ev) {
        $mdDialog.show({
            locals: {items: selectedBranch},
            templateUrl: RouteHelpers.basepath('mfisetup/branches/create.branch.dialog.html'),
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false,
            hasBackdrop: false,
            escapeToClose: true,
            controller: 'CreateBranchController',
            controllerAs: 'vm'
        }).then(function (answer) {
            getBranches();
        }, function () {
        });
    }

    function _changeStatus(ChangeStatus) {
      ChangeStatus.status = ChangeStatus.status === "active" ? "inactive" : "active";
      MainService.UpdateBranch(ChangeStatus).then(
        function(response) {

          AlertService.showSuccess(
              "Updated branch status",
              "Updated Status successfully."
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
