(function(angular) {
  "use strict";

  angular.module("bidirApp").controller("CommonController", CommonController);
  /**@ngInject */
  function CommonController($state, AuthService, $scope, _) {
    var vm = this;
    vm.currentUser = AuthService.GetCurrentUser();
    if (vm.currentUser === null || _.isUndefined(vm.currentUser)) {
      $state.go("auth.login");
    } else {
      vm.currentUser.name =
        vm.currentUser.admin.first_name + " " + vm.currentUser.admin.last_name;
    }

    vm.logout = function() {
      AuthService.Logout();
    };
  }
})(window.angular);
