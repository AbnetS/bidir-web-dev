(function(angular) {
'use strict';

angular.module('bidirApp')
  .controller('MainController', MainController);
  /**@ngInject */
  function MainController ($state,AlertService,$scope,MainService,$http) {
    var vm = this;
    console.log("main controller");
    vm.userName = 'Yonas Tesfaye';
    vm.helloText = 'Welcome';
    // $http.get('http://35.185.118.191:18199/MFIs').then(function(data){
    //   console.log(data);
    // });



    // MainService.MFI.query(
    //   function(response) {
    //   console.log("response", response);
    //     }, function(error) {
    //     console.log("error", error);
    // });

    vm.saveChanges =function(){
      console.log("MFI",vm.MFI);
       AlertService.showSuccess('Information saved successfully', "Info");
    };

    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

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
