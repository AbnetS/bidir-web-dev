(function(angular) {
    'use strict';
    angular.module('app.geospatial')

        .service('GeoSpatialService', GeoSpatialService);

    GeoSpatialService.$inject = ['$http','CommonService','AuthService'];

    function GeoSpatialService($http, CommonService, AuthService) {
        return {
            formatDateForRequest:_formatDateForRequest,
            getIndicatorsData:_getIndicatorData
        };

        function _getIndicatorData() {
            return $http.get("https://seasmon.wenr.wur.nl/cgi-bin/register.py?indicator=VI&start_date=2018-07-01&end_date=2018-12-05&regions=10212:10213:10301");
        }
        function _formatDateForRequest(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            return [year, month, day].join('');
        }

    }


})(window.angular);