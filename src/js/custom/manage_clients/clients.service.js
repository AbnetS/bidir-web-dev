/**
 * Created by Yoni on 1/8/2018.
 */

(function(angular) {
    'use strict';
    angular.module('app.mfi')

        .service('ClientService', ClientService);

    ClientService.$inject = ['$http','CommonService'];

    function ClientService($http, CommonService) {
        return {
            GetClients: _getClients,
            GetClientDetail:_getClientDetail
        };

        function _getClients(){
            return $http.get(CommonService.buildUrl(API.Service.SCREENING,API.Methods.Clients.All));
        }
        function _getClientDetail(id){
            return $http.get(CommonService.buildUrlWithParam(API.Service.SCREENING,API.Methods.Clients.Client,id));
        }
    }


})(window.angular);