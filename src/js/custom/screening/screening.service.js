/**
 * Created by Yoni on 3/30/2018.
 */

(function(angular) {
    'use strict';
    angular.module('app.screening')

        .service('ScreeningService', ScreeningService);

    ScreeningService.$inject = ['$http','CommonService'];

    function ScreeningService($http, CommonService) {
        return {
            GetScreenings: _getScreenings,
            GetScreeningByClientId:_getScreeningByClientId
        };
        function _getScreenings() {
            console.log("GET SCREENING LIST");
        }
        function _getScreeningByClientId(clientId) {
            console.log("Get SCREENING FOR CLIENT");
        }
    }


})(window.angular);