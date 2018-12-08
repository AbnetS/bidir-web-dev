(function(angular) {
    'use strict';
    angular.module('app.geospatial')

        .service('GeoSpatialService', GeoSpatialService);

    GeoSpatialService.$inject = ['$http','CommonService','AuthService','$rootScope'];

    function GeoSpatialService($http, CommonService, AuthService,$rootScope) {
        return {
            formatDateForRequest:_formatDateForRequest,
            getIndicatorsData:_getIndicatorData,
            CurrentUser: _getUser,
            SaveConfig : _saveConfig,
            GetUserConfig:_getUserConfig
        };

        function _getUser() {
            return  AuthService.GetCurrentUser();
        }

        function _getUserConfig(){
            var user = $rootScope.currentUser._id;// AuthService.GetCurrentUser();
            return $http.get(CommonService.buildUrlWithParam(API.Service.GEOSPATIAL,API.Methods.GeoSpatial.Config, 'search?user=' + user));
        }

        function _saveConfig(config){
            return $http.post(CommonService.buildUrl(API.Service.GEOSPATIAL,API.Methods.GeoSpatial.SaveConfig),config);
        }

        function _getIndicatorData(config) {
            var request = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': undefined
                },
                url: API.Config.SeasonalMonitoringBaseUrl +  'indicator='+config.indicator+'&start_date='+config.start_date+'&end_date='+config.end_date+'&regions=' +config.regions};


            return $http(request);
        }
        function _formatDateForRequest(date) {
            var d = new Date(date),
                month = '-' +  ("0" + (d.getMonth() + 1)).slice(-2) ,
                day = '-' + ("0" + d.getDate()).slice(-2),
                year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            return [year, month, day].join('');
        }

    }


})(window.angular);