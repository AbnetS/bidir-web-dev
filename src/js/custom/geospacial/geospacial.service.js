(function(angular) {
    'use strict';
    angular.module('app.geospatial')

        .service('GeoSpatialService', GeoSpatialService);

    GeoSpatialService.$inject = ['$http','CommonService','AuthService','$rootScope'];

    function GeoSpatialService($http, CommonService, AuthService,$rootScope) {
        return {
            formatDateForRequest:_formatDateForRequest,
            getSeasonalMonitorData:_getSeasonalMonitorData,
            CurrentUser: _getUser(),
            SaveConfig : _saveConfig,
            UpdateConfig:_updateConfig,
            GetUserConfig:_getUserConfig,
            DateOptionDefault:_dateOptionDefault
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
        function _updateConfig(config){
            return $http.put(CommonService.buildUrlWithParam(API.Service.GEOSPATIAL,API.Methods.GeoSpatial.Config,config._id),config);
        }

        function _getSeasonalMonitorData(config) {
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

        function _dateOptionDefault() {
            var vm = this;
            vm.dtOption = {};
            vm.dtOption.dateOptions = {
                dateDisabled: false, formatYear: "yy",
                maxDate: new Date(2020, 5, 22), startingDay: 1
            };
            vm.dtOption.format = "shortDate";
            vm.dtOption.altInputFormats = ["M!/d!/yyyy"];
            vm.dtOption.popup = {opened: false};
            vm.dtOption.fromPopup = {opened: false};
            vm.dtOption.open = function () {
                vm.dtOption.popup.opened = true;
            };
            vm.dtOption.fromOpen = function () {
                vm.dtOption.fromPopup.opened = true;
            };
            vm.dtOption.clear = function () {
                vm.dtOption.dt = null;
            };

            return vm.dtOption;
        }

    }


})(window.angular);