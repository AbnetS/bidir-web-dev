(function(angular) {
    'use strict';
    angular.module('app.banking')

        .service('CoreBankingService', CoreBankingService);

    CoreBankingService.$inject = ['$http','CommonService','AuthService'];

    function CoreBankingService($http, CommonService, AuthService) {
        return {
            GetClients: _getClients,
            SearchClient:_searchClient,
            PostClientToCBS:_postClientToCBS
        };

        function _getClients(parameters){
            return $http.get(CommonService.buildPerPageUrl(API.Service.SCREENING,API.Methods.CBS.Clients,parameters));
        }

        function _postClientToCBS(client){
            return $http.post(CommonService.buildPerPageUrl(API.Service.SCREENING,API.Methods.CBS.CBS,client));
        }

        function _searchClient(searchText) {
            return $http.get(CommonService.buildUrlForSearch(API.Service.SCREENING,API.Methods.CBS.Clients,searchText));
        }
    }

})(window.angular);