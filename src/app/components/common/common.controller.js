(function(angular) {
  "use strict";

  angular.module("bidirApp").controller("CommonController", CommonController);
  /**@ngInject */
  function CommonController(
    $state,
    AuthService,
    $scope
  ) {
    var vm = this;
    vm.currentUser = AuthService.GetCurrentUser();
    vm.currentUser.name = vm.currentUser.admin.first_name + ' '+ vm.currentUser.admin.last_name;

     vm.logout =function(){
          AuthService.Logout();
     };


  }
})(window.angular);
