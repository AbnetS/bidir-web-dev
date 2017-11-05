(function(angular) {
'use strict';

angular.module('bidirApp.home')
  .controller('HomeController', HomeController);

  /**@ngInject */
  function HomeController ($state,AlertService,$scope) {
    var vm = this;
    console.log("home controller");


  }

})(window.angular);
