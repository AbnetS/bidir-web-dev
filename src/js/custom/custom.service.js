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
            GetBranches: _getBranches
        };

        function _getBranches(){
            return $http.get(CommonService.buildPaginatedUrl(API.Service.MFI,API.Methods.MFI.Branches));
        }

    }

})(window.angular);