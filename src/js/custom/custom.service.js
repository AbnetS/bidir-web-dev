/**
 * Created by Yonas on 7/4/2018.
 */
(function(angular) {
    'use strict';
    angular.module('custom')

        .service('SharedService', SharedService);
    SharedService.$inject = ['$http', 'CommonService','$sce'];

    function SharedService($http, CommonService,$sce) {
        return {
            GetBranches: _getBranches,
            GetWoredas:_getWoredas
        };

        function _getBranches(){
            return $http.get(CommonService.buildPaginatedUrl(API.Service.MFI,API.Methods.MFI.Branches));
        }
        function _getWoredas(){
            return $http.get(CommonService.buildPaginatedUrl(API.Service.GEOSPATIAL,API.Methods.GeoSpatial.Woredas));
        }

    }

})(window.angular);