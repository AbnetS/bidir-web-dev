(function(angular) {
  'use strict';
  angular.module('bidirApp')

  .service('MainService', MainService);

  /**@ngInject */
  function MainService($resource,StorageService, CommonService, APP_CONSTANTS, $rootScope, $state) {

      var service = {
        getMFI: _getMFI
      };

      return service;

      function _getMFI(){
        return $resource(commonService.buildUrl(API.Methods.MFI), {}, GETObject).get().$promise;
      }
  }

})(window.angular);
