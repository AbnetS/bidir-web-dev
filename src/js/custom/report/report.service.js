(function(angular) {
    'use strict';
    angular.module('app.report')

        .service('ReportService', ReportService);

    ReportService.$inject = ['$http','CommonService','AuthService'];

    function ReportService($http, CommonService, AuthService) {
        // {{bidir_reports_service}}/5c0ce5e7c3bb100001b218e7

        return {
            GetLineChartReport:_getLineChartReport
        };

        function _getLineChartReport(config){
            return $http.get(CommonService.buildUrl(API.Service.REPORT,API.Methods.Report.ClientLineChart) + '5c0ce5e7c3bb100001b218e7');
        }
    }

})(window.angular);