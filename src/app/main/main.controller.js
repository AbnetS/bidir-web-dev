(function(angular) {
'use strict';

angular.module('bidirApp')
  .controller('MainController', mainController);
  /**@ngInject */
  function mainController ($state) {
    var vm = this;
    vm.userName = 'Yonas Tesfaye';
    vm.helloText = 'Welcome';
  }

})(window.angular);
