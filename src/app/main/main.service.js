(function(angular) {
  'use strict';
  angular.module('bidirApp')

  .service('MainService', MainService);

  /**@ngInject */
  function MainService($resource,StorageService, CommonService, APP_CONSTANTS, $rootScope, $state) {

      var service = {
        getMFI: _getMFI,
        MFI: $resource(CommonService.buildUrl(API.Methods.MFI), {  }, ResourceMethods.All)
      };

      return service;

      function _getMFI(){
        return $resource(CommonService.buildUrl(API.Methods.MFI), { id: "@id" }, ResourceMethods.All)
      }
  }

})(window.angular);
