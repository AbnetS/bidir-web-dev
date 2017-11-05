(function(angular) {
  "use strict";

  angular.module('bidirApp').controller("MainController", MainController);
  /**@ngInject */
  function MainController($state, AlertService, $scope, MainService, $uibModal,$log) {
    var vm = this;
    vm.saveChanges = saveChanges;
    vm.addBranch = addBranch;
    vm.editBranch = _editBranch;

    init();
    getBranches();

    function getBranches(){
      MainService.branches.query(function(result, responseHeaders) {
        vm.branches =result;
    },
    function(httpResponse) {
        console.log('Error while fetching branches', httpResponse);
    });
    }

    function addBranch(size) {
      var modalInstance = $uibModal.open({
        component: "branch",
        size: "md"
      });

      modalInstance.result.then(
        function(branch) {
          console.log("branch", branch);
        },
        function() {
          $log.info("modal-component dismissed at: " + new Date());
        }
      );
    }
    function _editBranch(selectedBranch) {

                  var modalInstance = $uibModal.open({
                      component: 'branch',
                      size: 'md',
                      resolve: {
                          branch: function(){
                            return selectedBranch;
                          }
                      }
                  });

                  modalInstance.result.then(function(updatedBranch) {

                      var upBranch = {
                          "name": updatedBranch.name,
                          "location": updatedBranch.location,
                          "opening_date": updatedBranch.opening_date,
                          "email": updatedBranch.email,
                          "phone": updatedBranch.phone
                      };

                      MainService.UpdateBranch.then(function(response) {
                        console.log('updated successfully', response);
                    }, function(error) {
                        console.log('could not be updated', error);
                    });

                  }, function() {
                      $log.info('modal-component dismissed without any change');
                  });
              }

    function saveChanges() {
      if (_.isUndefined(vm.MFI._id)) {
        MainService.CreateMFI(vm.MFI, vm.picFile).then(
          function(response) {
            AlertService.showSuccess(
              "MFI Information created successfully",
              "Information"
            );
            console.log("response", response);
          },
          function(error) {
            AlertService.showError(
              "Failed to create MFI!, Pleast try again",
              "Information"
            );
            console.log("error", error);
          }
        );
      } else {
        MainService.UpdateMFI(vm.MFI, vm.picFile).then(
          function(response) {
            AlertService.showSuccess(
              "MFI Information updated successfully",
              "Information"
            );
            console.log("response", response);
          },
          function(error) {
            AlertService.showError(
              "MFI Information update failed",
              "Information"
            );
            console.log("error", error);
          }
        );
      }
    }

    function init() {
      MainService.GetMFI().then(
        function(response) {
          vm.MFI = response.data[0];
          console.log("response", response);
        },
        function(error) {
          console.log("error", error);
        }
      );

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
  }
})(window.angular);
