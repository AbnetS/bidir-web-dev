(function(angular) {
    'use strict';
    angular.module('app.report')

        .service('ReportService', ReportService);

    ReportService.$inject = ['$http','CommonService','Colors'];

    function ReportService($http, CommonService, Colors) {
        return {
            GetLineChartReport:_getLineChartReport,
            GetReportById:_getReportById,
            GetAllReports:_getAllReports,
            barColors: [{backgroundColor: Colors.byName('success'), borderColor: Colors.byName('success')}, {backgroundColor: Colors.byName('info'),  borderColor: Colors.byName('info') }]
        };

        function _getReportById(id){
            return $http.get(CommonService.buildUrlWithParam(API.Service.REPORT,API.Methods.Report.Report,id));
        }
        function _getLineChartReport(config){
            return $http.get(CommonService.buildUrl(API.Service.REPORT,API.Methods.Report.Report) + '5c0ce5e7c3bb100001b218e7');
        }

        function _getAllReports(){
            return $http.get(CommonService.buildUrl(API.Service.REPORT,API.Methods.Report.AllReport));
        }
    }

})(window.angular);