(function(angular) {
  'use strict';
  var mfi = {
      templateUrl: 'app/components/mfi_setup/mfi/mfi.html',
      controller: 'MFIController',
      controllerAs: 'vm'
  };
  angular.module('components.mfi')
      .component('mfi', mfi)
      .config(routeConfig);

  /**@ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

  }

})(window.angular);
