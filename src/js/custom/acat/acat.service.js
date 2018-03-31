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
            UpdateCrop:_updateCrop,
            GetAllACATList: _getAllACAT,
            GetACATById: _getACATById,
            CreateACAT:_createACAT,
            AddCostList:_addCostList,
            UpdateCostList:_updateCostList,
            RemoveCostList:_removeCostList
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
        function _getACATById(id) {
            return $http.get(CommonService.buildUrlWithParam(API.Service.ACAT,API.Methods.ACAT.ACAT,id));
        }
        function _getAllACAT() {
            return $http.get(CommonService.buildPaginatedUrl(API.Service.ACAT,API.Methods.ACAT.ACAT));
        }
        function _addCostList(cost) {
            return $http.post(CommonService.buildUrl(API.Service.ACAT,API.Methods.ACAT.CostList),cost);
        }
        function _removeCostList(cost,type){
            return $http.put(CommonService.buildUrlWithParam(API.Service.ACAT,API.Methods.ACAT.CostListUpdate,cost._id,type), cost);
        }
        function _updateCostList(cost){
            return $http.put(CommonService.buildUrlWithParam(API.Service.ACAT,API.Methods.ACAT.CostListUpdate,cost._id), cost);
        }
        function _createACAT(acat) {
            return $http.post(CommonService.buildUrl(API.Service.ACAT,API.Methods.ACAT.CreateACAT),acat);
        }
    }


})(window.angular);