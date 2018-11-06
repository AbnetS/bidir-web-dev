(function(angular) {
    'use strict';
    angular.module('app.banking')

        .service('CoreBankingService', CoreBankingService);

    CoreBankingService.$inject = ['$http','CommonService','AuthService'];

    function CoreBankingService($http, CommonService, AuthService) {
        var Client = {};
        return {
            GetClients: _getClients,
            GetTitles: ["Obo","Ato","W/rt","W/ro","Mr","Mrs","Miss","Dr."],
            SearchClient:_searchClient,
            PostClientToCBS:_postClientToCBS,
            setClientInfo: _setClientInfo,
            getClientInfo: _getClientInfo,
            UpdateClient: _updateClient,
            GetClientById:_getClientById
        };

        function _setClientInfo(client) {
            Client = client;
        }
        function _getClientInfo() {
            return Client;
        }

        function _getClients(parameters){
            return $http.get(CommonService.buildPerPageUrl(API.Service.SCREENING,API.Methods.SCREENING.Clients,parameters));
        }

        function _postClientToCBS(client){
            return $http.post(CommonService.buildUrl(API.Service.SCREENING,API.Methods.CBS.CBS),client);
        }

        function _searchClient(searchText) {
            return $http.get(CommonService.buildUrlForSearch(API.Service.SCREENING,API.Methods.CBS.Clients,searchText));
        }

        function _updateClient(client) {
            return $http.put(CommonService.buildUrlWithParam(API.Service.SCREENING,API.Methods.SCREENING.Clients,client._id),client);
        }
        function _getClientById(id){
            return $http.get(CommonService.buildUrlWithParam(API.Service.SCREENING,API.Methods.Clients.Client,id));
        }


    }

})(window.angular);