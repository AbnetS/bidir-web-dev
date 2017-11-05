(function(angular) {
'use strict';

angular.module('bidirApp')
  .controller('MainController', MainController);
  /**@ngInject */
  function MainController ($state,AlertService,$scope,MainService) {
    var vm = this;
    console.log("main controller");
    vm.userName = 'Yonas Tesfaye';
    vm.helloText = 'Welcome';

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


  }

})(window.angular);
