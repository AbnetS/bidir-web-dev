(function(angular) {
'use strict';

angular.module('home')
  .controller('MainController', MainController);

  /**@ngInject */
  function MainController ($state,AlertService,$scope) {
    var vm = this;
    vm.userName = 'Yonas Tesfaye';
    vm.helloText = 'Welcome';

    vm.saveChanges =function(){
      console.log("save clicked");
    };


  }

})(window.angular);
