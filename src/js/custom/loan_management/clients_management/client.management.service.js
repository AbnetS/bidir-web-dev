/**
 * Created by Yoni on 1/8/2018.
 */

(function(angular) {
    'use strict';
    angular.module('app.clients')
        .service('ClientService', ClientService);

    ClientService.$inject = ['$http','CommonService'];

    function ClientService($http, CommonService) {
        return {
            GetClients: _getClients,
            GetClientDetail:_getClientDetail,
            SearchClient:_searchClient,
            GetBranches: _getBranches
        };
        function _searchClient(searchText) {
            return $http.get(CommonService.buildUrlForSearch(API.Service.SCREENING,API.Methods.Clients.Client,searchText));
        }

        function _getClientDetail(id){
            return $http.get(CommonService.buildUrlWithParam(API.Service.SCREENING,API.Methods.Clients.Client,id));
        }
        function _getBranches(){
            return $http.get(CommonService.buildPaginatedUrl(API.Service.MFI,API.Methods.MFI.Branches));
        }
        function _getClients(){
            return $http.get(CommonService.buildPaginatedUrl(API.Service.SCREENING,API.Methods.SCREENING.Clients));
        }
    }


})(window.angular);