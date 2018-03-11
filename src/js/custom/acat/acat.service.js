/**
 * Created by Yoni on 3/11/2018.
 */

(function(angular) {
    'use strict';
    angular.module('app.forms')

        .service('ACATService', ACATService);

    ACATService.$inject = ['$http','CommonService'];

    function ACATService($http, CommonService) {
        return {
            GetCrops:_getCrops,
            SaveCrop:_createCrop,
            UpdateCrop:_updateCrop
        };

        function _getCrops() {
            return $http.get(CommonService.buildPaginatedUrl(API.Service.ACAT,API.Methods.ACAT.Crop));
        }
        function _createCrop(crop){
            return $http.post(CommonService.buildUrl(API.Service.ACAT,API.Methods.ACAT.CreateCrop), crop);
        }
        function _updateCrop(crop){
            return $http.put(CommonService.buildUrlWithParam(API.Service.ACAT,API.Methods.ACAT.Crop,crop._id), crop);
        }
    }


})(window.angular);