(function(angular) {
'use strict';

angular.module('bidirApp')
  .controller('MainController', MainController);
  /**@ngInject */
  function MainController ($state,AlertService,$scope,MainService,$http) {
    var vm = this;

    MainService.GetMFI()
    .then(
    function(response) {
      vm.MFI = response.data[0];
    console.log("response", response);
      }, function(error) {
      console.log("error", error);
  });

    vm.saveChanges =function(){
if(_.isUndefined(vm.MFI._id)){
  MainService.CreateMFI(vm.MFI,vm.picFile).then(
    function(response) {
      AlertService.showSuccess('MFI Information created successfully', "Information");
    console.log("response", response);
      }, function(error) {
        AlertService.showError('Failed to create MFI!, Pleast try again', "Information");
      console.log("error", error);
  });
}else{
  MainService.UpdateMFI(vm.MFI,vm.picFile).then(
    function(response) {
      AlertService.showSuccess('MFI Information updated successfully', "Information");
    console.log("response", response);
      }, function(error) {
        AlertService.showError('MFI Information update failed', "Information");
      console.log("error", error);
  });
}
    };



    $scope.clear = function() {
      $scope.dt = null;
    };

    $scope.dateOptions = {
      dateDisabled: false,
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      startingDay: 1
    };

    $scope.open1 = function() {
      $scope.popup1.opened = true;
    };

    $scope.format = 'dd-MMMM-yyyy';
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
      opened: false
    };

  }

})(window.angular);
