(function(angular) {
  "use strict";

  angular.module("components.mfi").controller("MFIController", MFIController);

  /**@ngInject */
  function MFIController(
    $state,
    AlertService,
    $scope,
    MainService,
    $uibModal,
    $log,
    $http,
    CommonService,
    toastr
  )
  {
    var vm = this;
    vm.saveChanges = saveChanges;
    vm.MFISetupForm = {
      IsnameValid: true,
      IslocationValid: true,
      IslogoValid: true,
      Isestablishment_yearValid: true
  };


    init();

    function saveChanges() {

      vm.IsValidData = CommonService.Validation.ValidateForm(vm.MFISetupForm, vm.MFI);

      if (vm.IsValidData) {
        if (_.isUndefined(vm.MFI._id)) {
          MainService.CreateMFI(vm.MFI, vm.picFile).then(function(response) {
              AlertService.showSuccess("MFI Information created successfully", "Information");
              console.log("Create MFI", response);
            }, function(error) {
              AlertService.showError("Failed to create MFI!, Pleast try again", "Information");
              console.log("Create MFI Error", error);
            });
        } else {
          MainService.UpdateMFI(vm.MFI, vm.picFile).then(function(response) {
              AlertService.showSuccess("MFI Information updated successfully", "Information");
              console.log("Update MFI", response);
            }, function(error) {
              AlertService.showError("MFI Information update failed", "Information");
              console.log("UpdateMFI Error", error);
            });
        }
      } else {
        toastr.warning("Please fill the required fields and try again.", "Warning!");
      }
    }

    function init() {
      MainService.GetMFI().then(
        function(response) {
          if (response.data.length > 0) {
            vm.MFI = response.data[0];
            var dt = new Date(vm.MFI.establishment_year);
            vm.MFI.establishment_year = dt;
          }
          console.log("Get MFI", response);
        },
        function(error) {
          console.log("Get MFI Error", error);
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
